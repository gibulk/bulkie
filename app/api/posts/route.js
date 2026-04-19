import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../lib/supabase'
import { generateSlug, calculateReadingTime } from '../../lib/utils'

// GET - Ambil semua posts (admin)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit')) || 50
    const offset = parseInt(searchParams.get('offset')) || 0
    
    let query = supabaseAdmin
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)
    
    if (status) {
      query = query.eq('status', status)
    }
    
    if (category) {
      query = query.eq('category', category)
    }
    
    const { data, error } = await query
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Buat post baru
export async function POST(request) {
  try {
    const body = await request.json()
    const { title, excerpt, content, category, cover_image, status } = body
    
    if (!title || !content || !category) {
      return NextResponse.json(
        { error: 'Title, content, and category are required' },
        { status: 400 }
      )
    }
    
    const slug = generateSlug(title)
    const readingTime = calculateReadingTime(content)
    
    const postData = {
      title,
      slug,
      excerpt: excerpt || '',
      content,
      category,
      cover_image: cover_image || '',
      status: status || 'draft',
      reading_time: Math.ceil(readingTime.minutes),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    const { data, error } = await supabaseAdmin
      .from('posts')
      .insert([postData])
      .select()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ data: data[0] }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
