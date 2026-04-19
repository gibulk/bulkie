import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../lib/supabase'

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      )
    }
    
    return NextResponse.json({
      user: data.user,
      session: data.session
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
