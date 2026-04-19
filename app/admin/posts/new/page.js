'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { db } from '../../../lib/supabase'
import { generateSlug, calculateReadingTime } from '../../../lib/utils'
import RichTextEditor from '../../../components/RichTextEditor'
import toast from 'react-hot-toast'

export default function NewPostPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Ekonomi Global',
    cover_image: '',
    status: 'draft'
  })
  
  const categories = [
    'Ekonomi Global',
    'Geopolitik',
    'Geografi',
    'Sains dan Teknologi'
  ]
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleContentChange = (content) => {
    setFormData(prev => ({ ...prev, content }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const slug = generateSlug(formData.title)
      const readingTime = calculateReadingTime(formData.content)
      
      const postData = {
        ...formData,
        slug,
        reading_time: Math.ceil(readingTime.minutes),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      const { error } = await db.createPost(postData)
      
      if (error) throw error
      
      toast.success('Artikel berhasil disimpan!')
      router.push('/admin/posts')
    } catch (error) {
      console.error('Error creating post:', error)
      toast.error('Gagal menyimpan artikel')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Tulis Artikel Baru</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Judul Artikel
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bulkie-primary focus:border-transparent"
                placeholder="Masukkan judul artikel"
              />
            </div>
            
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                Ringkasan / Excerpt
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bulkie-primary focus:border-transparent"
                placeholder="Ringkasan singkat artikel (opsional)"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bulkie-primary focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bulkie-primary focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="cover_image" className="block text-sm font-medium text-gray-700 mb-1">
                URL Gambar Cover
              </label>
              <input
                type="url"
                id="cover_image"
                name="cover_image"
                value={formData.cover_image}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bulkie-primary focus:border-transparent"
                placeholder="https://example.com/image.jpg (opsional)"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Konten Artikel
          </label>
          <RichTextEditor
            content={formData.content}
            onChange={handleContentChange}
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-bulkie-primary text-white rounded-md hover:bg-bulkie-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Menyimpan...' : 'Simpan Artikel'}
          </button>
        </div>
      </form>
    </div>
  )
}
