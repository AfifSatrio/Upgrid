import { createServerClient } from '@/lib/supabase/server'
import { ok, serverError } from '@/lib/response'

// Public endpoint — testimoni yang ditampilkan di website
export async function GET() {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('testimoni')
      .select('id_testimoni, nama_tampil, nama_brand, rating, komentar')
      .eq('status_tampil', true)
      .order('created_at', { ascending: false })

    if (error) return serverError('Gagal mengambil data testimoni')
    return ok(data)
  } catch (err) {
    console.error('Error GET /api/testimoni:', err)
    return serverError()
  }
}
