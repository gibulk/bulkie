import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '../lib/utils'

export default function BlogCard({ post }) {
  const categoryColors = {
    'Ekonomi Global': 'bg-blue-100 text-blue-800',
    'Geopolitik': 'bg-red-100 text-red-800',
    'Geografi': 'bg-green-100 text-green-800',
    'Sains dan Teknologi': 'bg-purple-100 text-purple-800'
  }
  
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48 w-full">
          {post.cover_image ? (
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-bulkie-primary to-bulkie-accent" />
          )}
        </div>
      </Link>
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-800'}`}>
            {post.category}
          </span>
          <span className="text-xs text-gray-500">
            {formatDate(post.created_at)}
          </span>
        </div>
        
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 hover:text-bulkie-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt || post.content?.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-sm">
              <p className="text-gray-500">
                {post.reading_time || '5'} menit baca
              </p>
            </div>
          </div>
          
          <Link
            href={`/blog/${post.slug}`}
            className="text-bulkie-primary hover:text-bulkie-secondary font-medium text-sm"
          >
            Baca Selengkapnya →
          </Link>
        </div>
      </div>
    </article>
  )
}
