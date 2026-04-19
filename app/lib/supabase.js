import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Client untuk public access
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client untuk admin operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// Helper functions untuk database operations
export const db = {
  // Posts
  async getPosts({ limit = 10, offset = 0, category = null, status = 'published' }) {
    let query = supabase
      .from('posts')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)
    
    if (category) {
      query = query.eq('category', category)
    }
    
    const { data, error } = await query
    return { data, error }
  },
  
  async getPostBySlug(slug) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
    
    return { data, error }
  },
  
  async searchPosts(query) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .or(`title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`)
      .order('created_at', { ascending: false })
    
    return { data, error }
  },
  
  async getPostsByCategory(category, limit = 10) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('category', category)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(limit)
    
    return { data, error }
  },
  
  // Admin functions
  async getAllPostsAdmin() {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    return { data, error }
  },
  
  async createPost(postData) {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .insert([postData])
      .select()
    
    return { data, error }
  },
  
  async updatePost(id, postData) {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .update(postData)
      .eq('id', id)
      .select()
    
    return { data, error }
  },
  
  async deletePost(id) {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .delete()
      .eq('id', id)
    
    return { data, error }
  },
  
  // Categories
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    
    return { data, error }
  },
  
  // Statistics
  async getStats() {
    const { data: posts, error: postsError } = await supabaseAdmin
      .from('posts')
      .select('status, category')
    
    if (postsError) return { data: null, error: postsError }
    
    const stats = {
      total: posts.length,
      published: posts.filter(p => p.status === 'published').length,
      draft: posts.filter(p => p.status === 'draft').length,
      categories: {}
    }
    
    posts.forEach(post => {
      if (post.category) {
        stats.categories[post.category] = (stats.categories[post.category] || 0) + 1
      }
    })
    
    return { data: stats, error: null }
  }
}

// Authentication helper
export const auth = {
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },
  
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },
  
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },
  
  async getUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  }
      }
