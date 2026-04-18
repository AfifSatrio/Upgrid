import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? 'fallback-secret-change-me')

const PUBLIC_ADMIN_ROUTES = ['/api/admin/auth/login']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Hanya proteksi /api/admin/* (kecuali login)
  if (!pathname.startsWith('/api/admin')) {
    return NextResponse.next()
  }

  if (PUBLIC_ADMIN_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Ambil token dari cookie atau header Authorization
  const token =
    req.cookies.get('admin_token')?.value ??
    req.headers.get('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    await jwtVerify(token, secret)
    return NextResponse.next()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Token tidak valid atau sudah kadaluarsa' },
      { status: 401 }
    )
  }
}

export const config = {
  matcher: ['/api/admin/:path*'],
}
