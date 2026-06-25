import { NextRequest } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { ok, notFound, serverError, badRequest } from '@/lib/response'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { kode_pemesanan, id_progress, feedback_user } = body

    if (!kode_pemesanan || !id_progress || !feedback_user) {
      return badRequest('Field kode_pemesanan, id_progress, dan feedback_user wajib diisi')
    }

    const supabase = createServerClient()

    // Cek pemesanan ada dan cocok dengan kode
    const { data: pemesanan, error: errOrder } = await supabase
      .from('pemesanan')
      .select('id_pemesanan')
      .eq('kode_pemesanan', kode_pemesanan.toUpperCase())
      .single()

    if (errOrder || !pemesanan) {
      return notFound('Pesanan tidak ditemukan')
    }

    // Cek progress ada dan milik pesanan ini
    const { data: progress, error: errProgress } = await supabase
      .from('progress_pemesanan')
      .select('id_progress')
      .eq('id_progress', id_progress)
      .eq('id_pemesanan', pemesanan.id_pemesanan)
      .single()

    if (errProgress || !progress) {
      return notFound('Progress tidak ditemukan pada pesanan ini')
    }

    const { data, error } = await supabase
      .from('progress_pemesanan')
      .update({
        feedback_user,
        tanggal_feedback: new Date().toISOString()
      })
      .eq('id_progress', id_progress)
      .select()
      .single()

    if (error || !data) return serverError('Gagal menambahkan masukan')

    return ok(data, 'Masukan berhasil ditambahkan')
  } catch (err) {
    console.error('Error POST /api/orders/feedback:', err)
    return serverError()
  }
}
