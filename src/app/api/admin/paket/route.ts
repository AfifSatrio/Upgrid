import { NextRequest } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { getAdminFromRequest } from '@/lib/auth'
import { ok, created, badRequest, unauthorized, serverError } from '@/lib/response'
import { CreatePaketRequest } from '@/types/api'

export async function GET(req: NextRequest) {
  try {
    const admin = await getAdminFromRequest(req)
    if (!admin) return unauthorized()

    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('paket')
      .select('*, benefit_paket(*)')
      .order('created_at', { ascending: false })

    if (error) return serverError('Gagal mengambil data paket')
    return ok(data)
  } catch (err) {
    console.error('Error GET /api/admin/paket:', err)
    return serverError()
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getAdminFromRequest(req)
    if (!admin) return unauthorized()

    const body: CreatePaketRequest = await req.json()
    const { nama_paket, slug, harga, estimasi_hari, tipe_paket, benefit = [] } = body

    if (!nama_paket || !slug || !harga || !estimasi_hari || !tipe_paket) {
      return badRequest('Field nama_paket, slug, harga, estimasi_hari, tipe_paket wajib diisi')
    }

    const supabase = createServerClient()

    const { data: paket, error: paketError } = await supabase
      .from('paket')
      .insert({
        nama_paket,
        slug,
        deskripsi: body.deskripsi ?? null,
        harga,
        estimasi_hari,
        tipe_paket,
        status_aktif: body.status_aktif ?? true,
      })
      .select()
      .single()

    if (paketError || !paket) return serverError('Gagal membuat paket')

    if (benefit.length > 0) {
      const benefitRows = benefit.map((deskripsi_benefit: string) => ({
        id_paket: paket.id_paket,
        deskripsi_benefit,
      }))
      await supabase.from('benefit_paket').insert(benefitRows)
    }

    const { data: result } = await supabase
      .from('paket')
      .select('*, benefit_paket(*)')
      .eq('id_paket', paket.id_paket)
      .single()

    return created(result, 'Paket berhasil dibuat')
  } catch (err) {
    console.error('Error POST /api/admin/paket:', err)
    return serverError()
  }
}
