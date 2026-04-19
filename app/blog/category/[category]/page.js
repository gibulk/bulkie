import { db } from '../../../lib/supabase'
import BlogCard from '../../../components/BlogCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 3600

export async function generateMetadata({ params }) {
  const category = decodeURIComponent(params.category)
  
  return {
    title: `Kategori: ${category} - Bulkie`,
    description: `Kumpulan artikel analitis tentang ${category} di Bulkie.`,
  }
}

export default async function CategoryPage({ params }) {
  const category = decodeURIComponent(params.category)
  
  const { data: posts } = await db.getPostsByCategory(category, 50)
  
  if (!posts || posts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/blog" 
            className="text-bulkie-primary hover:text-bulkie-secondary mb-4 inline-block"
          >
            ← Kembali ke Blog
          </Link>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Kategori: {category}
          </h1>
        </div>
        
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">
            Belum ada artikel dalam kategori ini.
          </p>
          <Link 
            href="/blog" 
            className="mt-4 inline-block text-bulkie-primary hover:text-bulkie-secondary"
          >
            Lihat semua artikel →
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <Link 
          href="/blog" 
          className="text-bulkie-primary hover:text-bulkie-secondary mb-4 inline-block"
        >
          ← Kembali ke Blog
        </Link>
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
          Kategori: {category}
        </h1>
        <p className="text-gray-600">
          {posts.length} artikel ditemukan
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
            }
