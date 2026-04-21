import { NextRequest } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { getAdminFromRequest } from '@/lib/auth'
import { ok, unauthorized, serverError } from '@/lib/response'

export async function GET(req: NextRequest) {
  try {
    const admin = await getAdminFromRequest(req)
    if (!admin) return unauthorized()

    const supabase = createServerClient()
    const { data } = await supabase
      .from('admin')
      .select('id_admin, nama, email, role')
      .eq('id_admin', admin.id_admin)
      .single()

    return ok(data ?? admin)
  } catch (err) {
    console.error('Error GET /api/admin/auth/me:', err)
    return serverError()
  }
}
