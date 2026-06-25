import { NextRequest } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { ok, notFound, serverError } from '@/lib/response'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ kode: string }> }
) {
  try {
    const { kode } = await params
    if (!kode) return notFound('Kode pemesanan tidak valid')

    const supabase = createServerClient()

    const { data: pemesanan, error } = await supabase
      .from('pemesanan')
      .select(`
        id_pemesanan,
        kode_pemesanan,
        nama_proyek,
        total_harga,
        status_pemesanan,
        catatan_tambahan,
        tanggal_pesan,
        tanggal_mulai,
        tanggal_selesai,
        pelanggan (
          nama,
          email,
          no_telepon,
          nama_brand
        ),
        paket (
          nama_paket,
          tipe_paket,
          estimasi_hari
        ),
        pembayaran (
          status_pembayaran,
          payment_type,
          gross_amount,
          transaction_time,
          settlement_time,
          redirect_url,
          snap_token
        ),
        progress_pemesanan (
          id_progress,
          judul_update,
          deskripsi_progress,
          persentase,
          status_progress,
          tanggal_update,
          lampiran_urls,
          feedback_user,
          tanggal_feedback,
          balasan_admin,
          tanggal_balasan
        )
      `)
      .eq('kode_pemesanan', kode.toUpperCase())
      .single()

    if (error || !pemesanan) {
      return notFound('Pesanan dengan kode tersebut tidak ditemukan')
    }

    // Sort progress by tanggal_update desc
    const progress = (pemesanan.progress_pemesanan as Array<{ tanggal_update: string }> ?? [])
      .sort((a, b) => new Date(b.tanggal_update).getTime() - new Date(a.tanggal_update).getTime())

    // Mask email for public response (show only first 2 chars + ***)
    type PelangganShape = { nama: string; email: string; no_telepon: string; nama_brand: string | null }
    const pelanggan = pemesanan.pelanggan as unknown as PelangganShape | null
    const maskedEmail = pelanggan
      ? pelanggan.email.replace(/(.{2})(.*)(@.*)/, '$1***$3')
      : null

    const whatsappNumber = process.env.WHATSAPP_NUMBER ?? ''
    const waMessage = encodeURIComponent(
      `Halo, saya ingin menanyakan pesanan dengan kode: ${kode}`
    )

    return ok({
      kode_pemesanan: pemesanan.kode_pemesanan,
      nama_proyek: pemesanan.nama_proyek,
      total_harga: pemesanan.total_harga,
      status_pemesanan: pemesanan.status_pemesanan,
      catatan_tambahan: pemesanan.catatan_tambahan,
      tanggal_pesan: pemesanan.tanggal_pesan,
      tanggal_mulai: pemesanan.tanggal_mulai,
      tanggal_selesai: pemesanan.tanggal_selesai,
      pelanggan: pelanggan
        ? {
            nama: pelanggan.nama,
            email: maskedEmail,
            no_telepon: pelanggan.no_telepon,
            nama_brand: pelanggan.nama_brand,
          }
        : null,
      paket: pemesanan.paket,
      pembayaran: pemesanan.pembayaran,
      progress: progress,
      whatsapp_url: `https://wa.me/${whatsappNumber}?text=${waMessage}`,
    })
  } catch (err) {
    console.error('Error GET /api/orders/[kode]:', err)
    return serverError('Terjadi kesalahan pada server')
  }
}
