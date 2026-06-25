import { NextRequest } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { getAdminFromRequest } from '@/lib/auth'
import { ok, badRequest, unauthorized, serverError, notFound } from '@/lib/response'

export async function POST(req: NextRequest) {
  try {
    const admin = await getAdminFromRequest(req)
    if (!admin) return unauthorized()

    const body = await req.json()
    const { id_progress, balasan_admin } = body

    if (!id_progress || !balasan_admin) {
      return badRequest('Field id_progress dan balasan_admin wajib diisi')
    }

    const supabase = createServerClient()

    const { data: progress, error: errProgress } = await supabase
      .from('progress_pemesanan')
      .select('id_progress, feedback_user')
      .eq('id_progress', id_progress)
      .single()

    if (errProgress || !progress) {
      return notFound('Progress tidak ditemukan')
    }

    if (!progress.feedback_user) {
      return badRequest('Pelanggan belum memberikan masukan pada progress ini')
    }

    const { data, error } = await supabase
      .from('progress_pemesanan')
      .update({
        balasan_admin,
        tanggal_balasan: new Date().toISOString()
      })
      .eq('id_progress', id_progress)
      .select()
      .single()

    if (error || !data) return serverError('Gagal mengirim balasan')

    return ok(data, 'Balasan berhasil dikirim')
  } catch (err) {
    console.error('Error POST /api/admin/progress/reply:', err)
    return serverError()
  }
}
