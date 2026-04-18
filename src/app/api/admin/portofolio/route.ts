import { NextRequest } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { getAdminFromRequest } from '@/lib/auth'
import { ok, created, badRequest, unauthorized, serverError } from '@/lib/response'
import { CreatePortofolioRequest } from '@/types/api'

export async function GET(req: NextRequest) {
  try {
    const admin = await getAdminFromRequest(req)
    if (!admin) return unauthorized()

    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('portofolio')
      .select('*')
      .order('tanggal_publish', { ascending: false })

    if (error) return serverError('Gagal mengambil data portofolio')
    return ok(data)
  } catch (err) {
    console.error('Error GET /api/admin/portofolio:', err)
    return serverError()
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getAdminFromRequest(req)
    if (!admin) return unauthorized()

    const body: CreatePortofolioRequest = await req.json()
    if (!body.judul) return badRequest('Judul portofolio wajib diisi')

    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('portofolio')
      .insert({
        judul: body.judul,
        deskripsi: body.deskripsi ?? null,
        gambar: body.gambar ?? null,
        link_project: body.link_project ?? null,
        tanggal_publish: body.tanggal_publish ?? null,
        status_tampil: body.status_tampil ?? true,
      })
      .select()
      .single()

    if (error || !data) return serverError('Gagal membuat portofolio')
    return created(data, 'Portofolio berhasil dibuat')
  } catch (err) {
    console.error('Error POST /api/admin/portofolio:', err)
    return serverError()
  }
}
