import { NextRequest } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { getAdminFromRequest } from '@/lib/auth'
import { ok, created, badRequest, unauthorized, serverError } from '@/lib/response'
import { CreateProgressRequest } from '@/types/api'

export async function POST(req: NextRequest) {
  try {
    const admin = await getAdminFromRequest(req)
    if (!admin) return unauthorized()

    const body: CreateProgressRequest = await req.json()
    const { id_pemesanan, judul_update, persentase, status_progress, lampiran_urls } = body

    if (!id_pemesanan || !judul_update || persentase === undefined || !status_progress) {
      return badRequest('Field id_pemesanan, judul_update, persentase, dan status_progress wajib diisi')
    }

    const validStatus = ['brief', 'desain', 'development', 'revisi', 'selesai']
    if (!validStatus.includes(status_progress)) {
      return badRequest('status_progress tidak valid')
    }

    if (persentase < 0 || persentase > 100) {
      return badRequest('Persentase harus antara 0 - 100')
    }

    const supabase = createServerClient()

    // Cek pemesanan ada dan statusnya diproses
    const { data: pemesanan } = await supabase
      .from('pemesanan')
      .select('id_pemesanan, status_pemesanan')
      .eq('id_pemesanan', id_pemesanan)
      .single()

    if (!pemesanan) return badRequest('Pemesanan tidak ditemukan')

    const { data, error } = await supabase
      .from('progress_pemesanan')
      .insert({
        id_pemesanan,
        id_admin: admin.id_admin,
        judul_update,
        deskripsi_progress: body.deskripsi_progress ?? null,
        persentase,
        status_progress,
        lampiran_urls: lampiran_urls ?? null,
        tanggal_update: new Date().toISOString(),
      })
      .select()
      .single()

    if (error || !data) return serverError('Gagal menambahkan progress')

    // Jika persentase 100 & status selesai, update status pemesanan
    if (persentase === 100 && status_progress === 'selesai') {
      await supabase
        .from('pemesanan')
        .update({
          status_pemesanan: 'selesai',
          tanggal_selesai: new Date().toISOString(),
        })
        .eq('id_pemesanan', id_pemesanan)
    }

    return created(data, 'Progress berhasil ditambahkan')
  } catch (err) {
    console.error('Error POST /api/admin/progress:', err)
    return serverError()
  }
}
