import { NextRequest } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { getAdminFromRequest } from '@/lib/auth'
import { ok, unauthorized, notFound, serverError } from '@/lib/response'

type Params = { params: Promise<{ id: string }> }

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const admin = await getAdminFromRequest(req)
    if (!admin) return unauthorized()

    const { id } = await params
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('portofolio')
      .select('*')
      .eq('id_portofolio', Number(id))
      .single()

    if (error || !data) return notFound('Portofolio tidak ditemukan')
    return ok(data)
  } catch (err) {
    console.error('Error GET /api/admin/portofolio/[id]:', err)
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

    const { data, error } = await supabase
      .from('portofolio')
      .update(body)
      .eq('id_portofolio', Number(id))
      .select()
      .single()

    if (error || !data) return notFound('Portofolio tidak ditemukan')
    return ok(data, 'Portofolio berhasil diperbarui')
  } catch (err) {
    console.error('Error PUT /api/admin/portofolio/[id]:', err)
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
      .from('portofolio')
      .delete()
      .eq('id_portofolio', Number(id))

    if (error) return serverError('Gagal menghapus portofolio')
    return ok(null, 'Portofolio berhasil dihapus')
  } catch (err) {
    console.error('Error DELETE /api/admin/portofolio/[id]:', err)
    return serverError()
  }
}
