'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { db } from '../../lib/supabase'
import { FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi'
import { formatDate } from '../../lib/utils'
import toast from 'react-hot-toast'

export default function AdminPostsPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, published, draft
  
  useEffect(() => {
    fetchPosts()
  }, [])
  
  const fetchPosts = async () => {
    try {
      const { data } = await db.getAllPostsAdmin()
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
      toast.error('Gagal memuat artikel')
    } finally {
      setLoading(false)
    }
  }
  
  const handleDelete = async (id, title) => {
    if (!confirm(`Yakin ingin menghapus artikel "${title}"?`)) {
      return
    }
    
    try {
      const { error } = await db.deletePost(id)
      if (error) throw error
      
      toast.success('Artikel berhasil dihapus')
      fetchPosts()
    } catch (error) {
      toast.error('Gagal menghapus artikel')
    }
  }
  
  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true
    return post.status === filter
  })
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Manajemen Artikel</h1>
        <Link
          href="/admin/posts/new"
          className="flex items-center space-x-2 bg-bulkie-primary text-white px-4 py-2 rounded-md hover:bg-bulkie-secondary transition-colors"
        >
          <FiPlus />
          <span>Tulis Artikel Baru</span>
        </Link>
      </div>
      
      {/* Filter */}
      <div className="flex space-x-2 border-b border-gray-200">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 font-medium transition-colors ${
            filter === 'all'
              ? 'text-bulkie-primary border-b-2 border-bulkie-primary'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Semua ({posts.length})
        </button>
        <button
          onClick={() => setFilter('published')}
          className={`px-4 py-2 font-medium transition-colors ${
            filter === 'published'
              ? 'text-bulkie-primary border-b-2 border-bulkie-primary'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Published ({posts.filter(p => p.status === 'published').length})
        </button>
        <button
          onClick={() => setFilter('draft')}
          className={`px-4 py-2 font-medium transition-colors ${
            filter === 'draft'
              ? 'text-bulkie-primary border-b-2 border-bulkie-primary'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Draft ({posts.filter(p => p.status === 'draft').length})
        </button>
      </div>
      
      {/* Posts Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Judul
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPosts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {post.title}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{post.category}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    post.status === 'published'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {formatDate(post.created_at)}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    {post.status === 'published' && (
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="text-gray-600 hover:text-gray-900"
                        title="Lihat"
                      >
                        <FiEye className="w-4 h-4" />
                      </Link>
                    )}
                    <Link
                      href={`/admin/posts/edit/${post.id}`}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      className="text-red-600 hover:text-red-900"
                      title="Hapus"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredPosts.length === 0 && (
          <div className="px-6 py-8 text-center text-gray-500">
            Belum ada artikel. Mulai menulis artikel pertama Anda!
          </div>
        )}
      </div>
    </div>
  )
        }
