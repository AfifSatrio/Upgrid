import { SignJWT, jwtVerify } from 'jose'
import { NextRequest } from 'next/server'

const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? 'fallback-secret-change-me')

export interface AdminJwtPayload {
  id_admin: number
  email: string
  role: string
}

export async function signAdminToken(payload: AdminJwtPayload): Promise<string> {
  return await new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(secret)
}

export async function verifyAdminToken(token: string): Promise<AdminJwtPayload> {
  const { payload } = await jwtVerify(token, secret)
  return payload as unknown as AdminJwtPayload
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get('Authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7)
  }
  const cookie = req.cookies.get('admin_token')
  return cookie?.value ?? null
}

export async function getAdminFromRequest(req: NextRequest): Promise<AdminJwtPayload | null> {
  const token = getTokenFromRequest(req)
  if (!token) return null

  try {
    return await verifyAdminToken(token)
  } catch {
    return null
  }
}
