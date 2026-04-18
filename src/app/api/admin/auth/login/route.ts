import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { signAdminToken } from '@/lib/auth'
import { badRequest, unauthorized, serverError } from '@/lib/response'
import { AdminLoginRequest } from '@/types/api'
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest) {
  try {
    const body: AdminLoginRequest = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return badRequest('Email dan password wajib diisi')
    }

    const supabase = createServerClient()

    const { data: admin, error } = await supabase
      .from('admin')
      .select('id_admin, nama, email, password, role, status_aktif')
      .eq('email', email)
      .single()

    if (error || !admin) return unauthorized('Email atau password salah')
    if (!admin.status_aktif) return unauthorized('Akun tidak aktif')

    const isValid = await bcrypt.compare(password, admin.password)
    if (!isValid) return unauthorized('Email atau password salah')

    const token = await signAdminToken({
      id_admin: admin.id_admin,
      email: admin.email,
      role: admin.role,
    })

    const res = NextResponse.json({
      success: true,
      data: {
        token,
        admin: {
          id_admin: admin.id_admin,
          nama: admin.nama,
          email: admin.email,
          role: admin.role,
        },
      },
    })

    res.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8 hours
      path: '/',
    })

    return res
  } catch (err) {
    console.error('Error POST /api/admin/auth/login:', err)
    return serverError('Terjadi kesalahan pada server')
  }
}
