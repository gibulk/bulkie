import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')
    
    // Buat Supabase client dengan SERVICE ROLE KEY
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
    
    // Login dengan Supabase
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) {
      // Redirect kembali ke login dengan error
      return NextResponse.redirect(new URL('/login-simple?error=1', request.url))
    }
    
    // Buat response dengan redirect ke dashboard
    const response = NextResponse.redirect(new URL('/admin/dashboard', request.url))
    
    // Set session cookie
    if (data.session) {
      response.cookies.set('sb-access-token', data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })
      
      response.cookies.set('sb-refresh-token', data.session.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7
      })
    }
    
    return response
    
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.redirect(new URL('/login-simple?error=2', request.url))
  }
}
