import { NextRequest } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { getAdminFromRequest } from '@/lib/auth'
import { ok, created, badRequest, unauthorized, serverError } from '@/lib/response'
import { CreateTestimoniRequest } from '@/types/api'

export async function GET(req: NextRequest) {
  try {
    const admin = await getAdminFromRequest(req)
    if (!admin) return unauthorized()

    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('testimoni')
      .select('*, admin ( nama )')
      .order('created_at', { ascending: false })

    if (error) return serverError('Gagal mengambil data testimoni')
    return ok(data)
  } catch (err) {
    console.error('Error GET /api/admin/testimoni:', err)
    return serverError()
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getAdminFromRequest(req)
    if (!admin) return unauthorized()

    const body: CreateTestimoniRequest = await req.json()
    const { nama_tampil, rating, komentar } = body

    if (!nama_tampil || !rating || !komentar) {
      return badRequest('Field nama_tampil, rating, dan komentar wajib diisi')
    }
    if (rating < 1 || rating > 5) {
      return badRequest('Rating harus antara 1 - 5')
    }

    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('testimoni')
      .insert({
        id_admin: admin.id_admin,
        nama_tampil,
        nama_brand: body.nama_brand ?? null,
        rating,
        komentar,
        status_tampil: body.status_tampil ?? true,
      })
      .select()
      .single()

    if (error || !data) return serverError('Gagal membuat testimoni')
    return created(data, 'Testimoni berhasil ditambahkan')
  } catch (err) {
    console.error('Error POST /api/admin/testimoni:', err)
    return serverError()
  }
}
