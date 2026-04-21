import { NextRequest } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { getAdminFromRequest } from '@/lib/auth'
import { ok, badRequest, unauthorized, notFound, serverError } from '@/lib/response'
import { UpdateStatusPemesananRequest } from '@/types/api'

type Params = { params: Promise<{ id: string }> }

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const admin = await getAdminFromRequest(req)
    if (!admin) return unauthorized()

    const { id } = await params
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('pemesanan')
      .select(`
        *,
        pelanggan (*),
        paket (*, benefit_paket(*)),
        pembayaran (*),
        progress_pemesanan (*, admin ( nama ))
      `)
      .eq('id_pemesanan', Number(id))
      .single()

    if (error || !data) return notFound('Pemesanan tidak ditemukan')
    return ok(data)
  } catch (err) {
    console.error('Error GET /api/admin/pemesanan/[id]:', err)
    return serverError()
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const admin = await getAdminFromRequest(req)
    if (!admin) return unauthorized()

    const { id } = await params
    const body: UpdateStatusPemesananRequest = await req.json()

    const validStatuses = ['menunggu_pembayaran', 'diproses', 'review', 'selesai', 'dibatalkan']
    if (!body.status_pemesanan || !validStatuses.includes(body.status_pemesanan)) {
      return badRequest('Status pemesanan tidak valid')
    }

    const supabase = createServerClient()

    const updateData: Record<string, unknown> = {
      status_pemesanan: body.status_pemesanan,
    }
    if (body.tanggal_mulai) updateData.tanggal_mulai = body.tanggal_mulai
    if (body.tanggal_selesai) updateData.tanggal_selesai = body.tanggal_selesai

    const { data, error } = await supabase
      .from('pemesanan')
      .update(updateData)
      .eq('id_pemesanan', Number(id))
      .select()
      .single()

    if (error) {
      console.error('Supabase PUT pemesanan error:', error)
      return serverError(error.message ?? 'Gagal memperbarui status')
    }
    if (!data) return notFound('Pemesanan tidak ditemukan')
    return ok(data, 'Status pemesanan berhasil diperbarui')
  } catch (err) {
    console.error('Error PUT /api/admin/pemesanan/[id]:', err)
    return serverError()
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const admin = await getAdminFromRequest(req)
    if (!admin) return unauthorized()

    const { id } = await params
    const numId = Number(id)
    const supabase = createServerClient()

    // Delete child records first to avoid FK constraint violations
    const [prog, bayar] = await Promise.all([
      supabase.from('progress_pemesanan').delete().eq('id_pemesanan', numId),
      supabase.from('pembayaran').delete().eq('id_pemesanan', numId),
    ])

    if (prog.error) {
      console.error('Delete progress error:', prog.error)
      return serverError('Gagal menghapus data progress: ' + prog.error.message)
    }
    if (bayar.error) {
      console.error('Delete pembayaran error:', bayar.error)
      return serverError('Gagal menghapus data pembayaran: ' + bayar.error.message)
    }

    const { error } = await supabase
      .from('pemesanan')
      .delete()
      .eq('id_pemesanan', numId)

    if (error) {
      console.error('Delete pemesanan error:', error)
      return serverError(error.message ?? 'Gagal menghapus pesanan')
    }
    return ok(null, 'Pesanan berhasil dihapus')
  } catch (err) {
    console.error('Error DELETE /api/admin/pemesanan/[id]:', err)
    return serverError()
  }
}
