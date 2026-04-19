import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../lib/supabase'
import slugify from 'slugify'

// GET - Ambil semua kategori
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('categories')
      .select('*')
      .order('name')
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Buat kategori baru
export async function POST(request) {
  try {
    const body = await request.json()
    const { name, description } = body
    
    if (!name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      )
    }
    
    const slug = slugify(name, { lower: true, strict: true })
    
    const { data, error } = await supabaseAdmin
      .from('categories')
      .insert([{
        name,
        slug,
        description: description || '',
        created_at: new Date().toISOString()
      }])
      .select()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ data: data[0] }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
