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
      .from('testimoni')
      .update(body)
      .eq('id_testimoni', Number(id))
      .select()
      .single()

    if (error || !data) return notFound('Testimoni tidak ditemukan')
    return ok(data, 'Testimoni berhasil diperbarui')
  } catch (err) {
    console.error('Error PUT /api/admin/testimoni/[id]:', err)
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
      .from('testimoni')
      .delete()
      .eq('id_testimoni', Number(id))

    if (error) return serverError('Gagal menghapus testimoni')
    return ok(null, 'Testimoni berhasil dihapus')
  } catch (err) {
    console.error('Error DELETE /api/admin/testimoni/[id]:', err)
    return serverError()
  }
}
