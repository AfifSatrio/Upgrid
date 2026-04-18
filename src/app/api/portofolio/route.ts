import { createServerClient } from '@/lib/supabase/server'
import { ok, serverError } from '@/lib/response'

// Public endpoint — portofolio yang ditampilkan di website
export async function GET() {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('portofolio')
      .select('id_portofolio, judul, deskripsi, gambar, link_project, tanggal_publish')
      .eq('status_tampil', true)
      .order('tanggal_publish', { ascending: false })

    if (error) return serverError('Gagal mengambil data portofolio')
    return ok(data)
  } catch (err) {
    console.error('Error GET /api/portofolio:', err)
    return serverError()
  }
}
