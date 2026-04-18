import { NextResponse } from 'next/server'
import { ApiResponse } from '@/types/api'

export function ok<T>(data: T, message?: string): NextResponse {
  return NextResponse.json({ success: true, data, message } satisfies ApiResponse<T>)
}

export function created<T>(data: T, message?: string): NextResponse {
  return NextResponse.json({ success: true, data, message } satisfies ApiResponse<T>, { status: 201 })
}

export function badRequest(error: string): NextResponse {
  return NextResponse.json({ success: false, error } satisfies ApiResponse, { status: 400 })
}

export function unauthorized(error = 'Unauthorized'): NextResponse {
  return NextResponse.json({ success: false, error } satisfies ApiResponse, { status: 401 })
}

export function forbidden(error = 'Forbidden'): NextResponse {
  return NextResponse.json({ success: false, error } satisfies ApiResponse, { status: 403 })
}

export function notFound(error = 'Not found'): NextResponse {
  return NextResponse.json({ success: false, error } satisfies ApiResponse, { status: 404 })
}

export function serverError(error = 'Internal server error'): NextResponse {
  return NextResponse.json({ success: false, error } satisfies ApiResponse, { status: 500 })
}
