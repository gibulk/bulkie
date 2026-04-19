import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supabase'
import { generateSlug, calculateReadingTime } from '../../../lib/utils'

// GET - Ambil post by ID
export async function GET(request, { params }) {
  try {
    const { id } = params
    
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 })
    }
    
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - Update post
export async function PUT(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    const { title, excerpt, content, category, cover_image, status } = body
    
    const updateData = {
      updated_at: new Date().toISOString()
    }
    
    if (title !== undefined) {
      updateData.title = title
      updateData.slug = generateSlug(title)
    }
    
    if (excerpt !== undefined) updateData.excerpt = excerpt
    if (category !== undefined) updateData.category = category
    if (cover_image !== undefined) updateData.cover_image = cover_image
    if (status !== undefined) updateData.status = status
    
    if (content !== undefined) {
      updateData.content = content
      const readingTime = calculateReadingTime(content)
      updateData.reading_time = Math.ceil(readingTime.minutes)
    }
    
    const { data, error } = await supabaseAdmin
      .from('posts')
      .update(updateData)
      .eq('id', id)
      .select()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ data: data[0] })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Hapus post
export async function DELETE(request, { params }) {
  try {
    const { id } = params
    
    const { error } = await supabaseAdmin
      .from('posts')
      .delete()
      .eq('id', id)
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
