import { createServerClient } from '@/lib/supabase/server'
import { ok, serverError } from '@/lib/response'

// Public endpoint — menampilkan semua paket aktif untuk halaman website
export async function GET() {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('paket')
      .select('*, benefit_paket(*)')
      .eq('status_aktif', true)
      .order('id_paket', { ascending: true })

    if (error) {
      console.error('Supabase error:', error)
      return serverError('Gagal mengambil data paket')
    }
    return ok(data)
  } catch (err) {
    console.error('Error GET /api/paket:', err)
    return serverError()
  }
}
