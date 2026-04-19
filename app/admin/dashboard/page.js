'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { db } from '../../lib/supabase'
import { FiFileText, FiEye, FiEdit, FiPlus } from 'react-icons/fi'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null)
  const [recentPosts, setRecentPosts] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchData()
  }, [])
  
  const fetchData = async () => {
    try {
      const [statsResult, postsResult] = await Promise.all([
        db.getStats(),
        db.getAllPostsAdmin()
      ])
      
      setStats(statsResult.data)
      setRecentPosts(postsResult.data?.slice(0, 5) || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading...</div>
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
          <span>Tulis Artikel Baru</span>
        </Link>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Artikel</p>
              <p className="text-3xl font-bold text-gray-900">{stats?.total || 0}</p>
            </div>
            <FiFileText className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Published</p>
              <p className="text-3xl font-bold text-green-600">{stats?.published || 0}</p>
            </div>
            <FiEye className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Draft</p>
              <p className="text-3xl font-bold text-yellow-600">{stats?.draft || 0}</p>
            </div>
            <FiEdit className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>
      
      {/* Category Stats */}
      {stats?.categories && Object.keys(stats.categories).length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Artikel per Kategori</h2>
          <div className="space-y-3">
            {Object.entries(stats.categories).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-gray-700">{category}</span>
                <span className="font-medium text-gray-900">{count} artikel</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Recent Posts */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Artikel Terbaru</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentPosts.map((post) => (
            <div key={post.id} className="px-6 py-4 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-gray-900 font-medium">{post.title}</h3>
                <div className="flex items-center space-x-4 mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    post.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                  <span className="text-sm text-gray-500">{post.category}</span>
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
        {recentPosts.length === 0 && (
          <div className="px-6 py-8 text-center text-gray-500">
            Belum ada artikel. Mulai menulis artikel pertama Anda!
          </div>
        )}
      </div>
    </div>
  )
        }
