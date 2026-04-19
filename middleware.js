import { NextResponse } from 'next/server'

export function middleware(request) {
  // BYPASS - Tidak ada check untuk sementara
  return NextResponse.next()
}

export const config = {
  matcher: [], // Kosongkan - tidak ada route yang di-check
}
