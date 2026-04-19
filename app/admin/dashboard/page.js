'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'
import { FiFileText, FiEye, FiEdit, FiPlus } from 'react-icons/fi'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0
  })
  const [recentPosts, setRecentPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    fetchData()
  }, [])
  
  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Ambil semua posts
      const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (postsError) {
        // Coba fallback ke public access
        const { data: publicPosts, error: publicError } = await supabase
          .from('posts')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false })
        
        if (publicError) throw publicError
        
        setStats({
          total: publicPosts?.length || 0,
          published: publicPosts?.length || 0,
          draft: 0
        })
        setRecentPosts(publicPosts?.slice(0, 5) || [])
      } else {
        const publishedCount = posts?.filter(p => p.status === 'published').length || 0
        const draftCount = posts?.filter(p => p.status === 'draft').length || 0
        
        setStats({
          total: posts?.length || 0,
          published: publishedCount,
          draft: draftCount
        })
        setRecentPosts(posts?.slice(0, 5) || [])
      }
    } catch (err) {
      console.error('Error fetching data:', err)
      setError(err.message)
      // Set default values
      setStats({ total: 0, published: 0, draft: 0 })
      setRecentPosts([])
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-bulkie-primary border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Memuat dashboard...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Link
          href="/admin/posts/new"
          className="flex items-center space-x-2 bg-bulkie-primary text-white px-4 py-2 rounded-md hover:bg-bulkie-secondary transition-colors"
        >
          <FiPlus />
          <span>Tulis Artikel</span>
        </Link>
      </div>
      
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
          <p>⚠️ Ada masalah koneksi ke database: {error}</p>
          <p className="text-sm mt-1">Pastikan Supabase sudah di-setup dengan benar.</p>
        </div>
      )}
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Artikel</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <FiFileText className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Published</p>
              <p className="text-3xl font-bold text-green-600">{stats.published}</p>
            </div>
            <FiEye className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Draft</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.draft}</p>
            </div>
            <FiEdit className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>
      
      {/* Recent Posts */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Artikel Terbaru</h2>
        </div>
        
        {recentPosts.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {recentPosts.map((post) => (
              <div key={post.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-gray-900 font-medium">{post.title || 'Untitled'}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      post.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                    <span className="text-sm text-gray-500">{post.category || '-'}</span>
                  </div>
                </div>
                <Link
                  href={`/admin/posts/edit/${post.id}`}
                  className="text-bulkie-primary hover:text-bulkie-secondary"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-8 text-center text-gray-500">
            <p>Belum ada artikel.</p>
            <Link
              href="/admin/posts/new"
              className="mt-2 inline-block text-bulkie-primary hover:text-bulkie-secondary"
            >
              Tulis artikel pertama →
            </Link>
          </div>
        )}
      </div>
      
      {/* Debug Info (hapus nanti) */}
      <div className="text-xs text-gray-400 p-4 bg-gray-50 rounded">
        <p>Login Status: ✅ Authenticated</p>
        <p>Total Posts: {stats.total}</p>
      </div>
    </div>
  )
        }
