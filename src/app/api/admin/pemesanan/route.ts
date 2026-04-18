import { NextRequest } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { getAdminFromRequest } from '@/lib/auth'
import { ok, unauthorized, serverError } from '@/lib/response'

export async function GET(req: NextRequest) {
  try {
    const admin = await getAdminFromRequest(req)
    if (!admin) return unauthorized()

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') ?? '1')
    const limit = parseInt(searchParams.get('limit') ?? '20')
    const offset = (page - 1) * limit

    const supabase = createServerClient()

    let query = supabase
      .from('pemesanan')
      .select(`
        id_pemesanan,
        kode_pemesanan,
        nama_proyek,
        total_harga,
        status_pemesanan,
        tanggal_pesan,
        tanggal_mulai,
        tanggal_selesai,
        pelanggan ( nama, email, no_telepon, nama_brand ),
        paket ( nama_paket, tipe_paket ),
        pembayaran ( status_pembayaran, payment_type, gross_amount )
      `, { count: 'exact' })
      .order('tanggal_pesan', { ascending: false })
      .range(offset, offset + limit - 1)

    if (status) {
      query = query.eq('status_pemesanan', status)
    }

    const { data, error, count } = await query

    if (error) return serverError('Gagal mengambil data pemesanan')

    return ok({
      data,
      pagination: {
        total: count ?? 0,
        page,
        limit,
        total_pages: Math.ceil((count ?? 0) / limit),
      },
    })
  } catch (err) {
    console.error('Error GET /api/admin/pemesanan:', err)
    return serverError()
  }
}
