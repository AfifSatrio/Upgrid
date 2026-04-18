import { NextRequest } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { ok, notFound, serverError } from '@/lib/response'

// Public endpoint — detail paket by slug
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('paket')
      .select('*, benefit_paket(*)')
      .eq('slug', slug)
      .eq('status_aktif', true)
      .single()

    if (error || !data) return notFound('Paket tidak ditemukan')
    return ok(data)
  } catch (err) {
    console.error('Error GET /api/paket/[slug]:', err)
    return serverError()
  }
}
