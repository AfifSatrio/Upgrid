import { NextRequest } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { createSnapTransaction } from '@/lib/midtrans'
import { generateKodePemesanan, generateMidtransOrderId } from '@/lib/order-code'
import { badRequest, created, serverError } from '@/lib/response'
import { CreateOrderRequest } from '@/types/api'

export async function POST(req: NextRequest) {
  try {
    const body: CreateOrderRequest = await req.json()

    // --- Validation ---
    const { nama, email, no_telepon, id_paket, nama_proyek } = body
    if (!nama || !email || !no_telepon || !id_paket || !nama_proyek) {
      return badRequest('Field nama, email, no_telepon, id_paket, dan nama_proyek wajib diisi')
    }

    const supabase = createServerClient()

    // --- Ambil data paket ---
    const { data: paket, error: paketError } = await supabase
      .from('paket')
      .select('id_paket, nama_paket, harga, status_aktif')
      .eq('id_paket', id_paket)
      .single()

    if (paketError || !paket) return badRequest('Paket tidak ditemukan')
    if (!paket.status_aktif) return badRequest('Paket tidak tersedia')

    // --- Simpan pelanggan ---
    const { data: pelanggan, error: pelangganError } = await supabase
      .from('pelanggan')
      .insert({
        nama: body.nama,
        email: body.email,
        no_telepon: body.no_telepon,
        nama_brand: body.nama_brand ?? null,
        alamat: body.alamat ?? null,
      })
      .select()
      .single()

    if (pelangganError || !pelanggan) {
      console.error('Error simpan pelanggan:', pelangganError)
      return serverError('Gagal menyimpan data pelanggan')
    }

    // --- Buat kode_pemesanan unik ---
    let kode_pemesanan = generateKodePemesanan()
    // Pastikan kode unik (retry sekali jika collision)
    const { data: existing } = await supabase
      .from('pemesanan')
      .select('id_pemesanan')
      .eq('kode_pemesanan', kode_pemesanan)
      .maybeSingle()

    if (existing) {
      kode_pemesanan = generateKodePemesanan()
    }

    // --- Simpan pemesanan ---
    const { data: pemesanan, error: pemesananError } = await supabase
      .from('pemesanan')
      .insert({
        id_pelanggan: pelanggan.id_pelanggan,
        id_paket: paket.id_paket,
        kode_pemesanan,
        nama_proyek: body.nama_proyek,
        total_harga: paket.harga,
        status_pemesanan: 'menunggu_pembayaran',
        catatan_tambahan: body.catatan_tambahan ?? null,
      })
      .select()
      .single()

    if (pemesananError || !pemesanan) {
      console.error('Error simpan pemesanan:', pemesananError)
      return serverError('Gagal menyimpan data pemesanan')
    }

    // --- Buat transaksi Midtrans Snap ---
    const midtransOrderId = generateMidtransOrderId(kode_pemesanan)

    const snapResult = await createSnapTransaction({
      orderId: midtransOrderId,
      grossAmount: paket.harga,
      customerName: pelanggan.nama,
      customerEmail: pelanggan.email,
      customerPhone: pelanggan.no_telepon,
      itemName: paket.nama_paket,
      itemPrice: paket.harga,
    })

    // --- Simpan data pembayaran (status: pending) ---
    const { error: pembayaranError } = await supabase
      .from('pembayaran')
      .insert({
        id_pemesanan: pemesanan.id_pemesanan,
        midtrans_order_id: midtransOrderId,
        snap_token: snapResult.token,
        redirect_url: snapResult.redirect_url,
        status_pembayaran: 'pending',
      })

    if (pembayaranError) {
      console.error('Error simpan pembayaran:', pembayaranError)
      return serverError('Gagal menyimpan data pembayaran')
    }

    return created({
      kode_pemesanan,
      snap_token: snapResult.token,
      redirect_url: snapResult.redirect_url,
      pemesanan: {
        id_pemesanan: pemesanan.id_pemesanan,
        nama_proyek: pemesanan.nama_proyek,
        total_harga: pemesanan.total_harga,
        status_pemesanan: pemesanan.status_pemesanan,
      },
    }, 'Pesanan berhasil dibuat')
  } catch (err) {
    console.error('Error POST /api/orders:', err)
    return serverError('Terjadi kesalahan pada server')
  }
}
