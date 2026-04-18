import { NextRequest } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { getAdminFromRequest } from '@/lib/auth'
import { ok, unauthorized, notFound, serverError } from '@/lib/response'

type Params = { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const admin = await getAdminFromRequest(req)
    if (!admin) return unauthorized()

    const { id } = await params
    const body = await req.json()
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('progress_pemesanan')
      .update(body)
      .eq('id_progress', Number(id))
      .select()
      .single()

    if (error || !data) return notFound('Progress tidak ditemukan')
    return ok(data, 'Progress berhasil diperbarui')
  } catch (err) {
    console.error('Error PUT /api/admin/progress/[id]:', err)
    return serverError()
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const admin = await getAdminFromRequest(req)
    if (!admin) return unauthorized()

    const { id } = await params
    const supabase = createServerClient()

    const { error } = await supabase
      .from('progress_pemesanan')
      .delete()
      .eq('id_progress', Number(id))

    if (error) return serverError('Gagal menghapus progress')
    return ok(null, 'Progress berhasil dihapus')
  } catch (err) {
    console.error('Error DELETE /api/admin/progress/[id]:', err)
    return serverError()
  }
}
