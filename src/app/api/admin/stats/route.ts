import { NextRequest } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { getAdminFromRequest } from '@/lib/auth'
import { ok, unauthorized, serverError } from '@/lib/response'

export async function GET(req: NextRequest) {
  try {
    const admin = await getAdminFromRequest(req)
    if (!admin) return unauthorized()

    const supabase = createServerClient()

    const [pemesananRes, pembayaranRes, recentRes] = await Promise.all([
      supabase.from('pemesanan').select('status_pemesanan'),
      supabase
        .from('pembayaran')
        .select('gross_amount, status_pembayaran')
        .in('status_pembayaran', ['settlement', 'capture', 'paid']),
      supabase
        .from('pemesanan')
        .select(`
          id_pemesanan, kode_pemesanan, nama_proyek, total_harga,
          status_pemesanan, tanggal_pesan,
          pelanggan ( nama ),
          paket ( nama_paket )
        `)
        .order('tanggal_pesan', { ascending: false })
        .limit(5),
    ])

    const counts: Record<string, number> = {
      total: 0,
      menunggu_pembayaran: 0,
      diproses: 0,
      review: 0,
      selesai: 0,
      dibatalkan: 0,
    }

    if (pemesananRes.data) {
      counts.total = pemesananRes.data.length
      pemesananRes.data.forEach((r) => {
        const s = r.status_pemesanan
        if (s in counts) counts[s]++
      })
    }

    const total_pendapatan =
      pembayaranRes.data?.reduce((sum, p) => sum + (Number(p.gross_amount) || 0), 0) ?? 0

    return ok({
      total_pendapatan,
      total_pemesanan: counts.total,
      pemesanan_aktif: counts.diproses + counts.review,
      pemesanan_selesai: counts.selesai,
      pemesanan_menunggu: counts.menunggu_pembayaran,
      recent_orders: recentRes.data ?? [],
    })
  } catch (err) {
    console.error('Error GET /api/admin/stats:', err)
    return serverError()
  }
}
