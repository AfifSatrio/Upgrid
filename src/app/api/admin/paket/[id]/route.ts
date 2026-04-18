import { NextRequest } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { getAdminFromRequest } from '@/lib/auth'
import { ok, badRequest, unauthorized, notFound, serverError } from '@/lib/response'

type Params = { params: Promise<{ id: string }> }

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const admin = await getAdminFromRequest(req)
    if (!admin) return unauthorized()

    const { id } = await params
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('paket')
      .select('*, benefit_paket(*)')
      .eq('id_paket', Number(id))
      .single()

    if (error || !data) return notFound('Paket tidak ditemukan')
    return ok(data)
  } catch (err) {
    console.error('Error GET /api/admin/paket/[id]:', err)
    return serverError()
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const admin = await getAdminFromRequest(req)
    if (!admin) return unauthorized()

    const { id } = await params
    const body = await req.json()
    const supabase = createServerClient()

    const { benefit, ...paketFields } = body

    const { data: paket, error } = await supabase
      .from('paket')
      .update(paketFields)
      .eq('id_paket', Number(id))
      .select()
      .single()

    if (error || !paket) return notFound('Paket tidak ditemukan')

    // Replace benefits jika dikirim
    if (Array.isArray(benefit)) {
      await supabase.from('benefit_paket').delete().eq('id_paket', Number(id))
      if (benefit.length > 0) {
        const rows = benefit.map((deskripsi_benefit: string) => ({
          id_paket: Number(id),
          deskripsi_benefit,
        }))
        await supabase.from('benefit_paket').insert(rows)
      }
    }

    const { data: result } = await supabase
      .from('paket')
      .select('*, benefit_paket(*)')
      .eq('id_paket', Number(id))
      .single()

    return ok(result, 'Paket berhasil diperbarui')
  } catch (err) {
    console.error('Error PUT /api/admin/paket/[id]:', err)
    return serverError()
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const admin = await getAdminFromRequest(req)
    if (!admin) return unauthorized()

    const { id } = await params
    const supabase = createServerClient()

    // Cek apakah paket punya pemesanan aktif
    const { data: activePemesanan } = await supabase
      .from('pemesanan')
      .select('id_pemesanan')
      .eq('id_paket', Number(id))
      .not('status_pemesanan', 'in', '("selesai","dibatalkan")')
      .limit(1)
      .maybeSingle()

    if (activePemesanan) {
      return badRequest('Paket tidak bisa dihapus karena masih ada pemesanan aktif')
    }

    const { error } = await supabase
      .from('paket')
      .delete()
      .eq('id_paket', Number(id))

    if (error) return serverError('Gagal menghapus paket')
    return ok(null, 'Paket berhasil dihapus')
  } catch (err) {
    console.error('Error DELETE /api/admin/paket/[id]:', err)
    return serverError()
  }
}
