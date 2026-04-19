import { db } from '../../lib/supabase'
import { formatDate, calculateReadingTime } from '../../lib/utils'
import ShareButtons from '../../components/ShareButtons'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export const revalidate = 3600

export async function generateMetadata({ params }) {
  const { data: post } = await db.getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Artikel Tidak Ditemukan',
      description: 'Maaf, artikel yang Anda cari tidak ditemukan.'
    }
  }
  
  return {
    title: `${post.title} - Bulkie`,
    description: post.excerpt || post.content?.replace(/<[^>]*>/g, '').substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.cover_image ? [post.cover_image] : [],
    },
  }
}

export default async function BlogPostPage({ params }) {
  const { data: post } = await db.getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }
  
  const readingTime = calculateReadingTime(post.content || '')
  
  const categoryColors = {
    'Ekonomi Global': 'text-blue-600',
    'Geopolitik': 'text-red-600',
    'Geografi': 'text-green-600',
    'Sains dan Teknologi': 'text-purple-600'
  }
  
  return (
    <article className="max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <div className="mb-4">
          <span className={`text-sm font-medium ${categoryColors[post.category] || 'text-gray-600'}`}>
            {post.category}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        
        {post.excerpt && (
          <p className="text-xl text-gray-600 mb-6">
            {post.excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between border-b border-gray-200 pb-6">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm text-gray-600">
                Dipublikasikan pada{' '}
                <time dateTime={post.created_at}>
                  {formatDate(post.created_at)}
                </time>
              </p>
              <p className="text-sm text-gray-500">
                {readingTime.text}
              </p>
            </div>
          </div>
          
          <ShareButtons title={post.title} />
        </div>
      </header>
      
      {/* Cover Image */}
      {post.cover_image && (
        <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      
      {/* Content */}
      <div 
        className="prose prose-lg max-w-none prose-headings:font-serif prose-a:text-bulkie-primary"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">
              Terakhir diperbarui:{' '}
              <time dateTime={post.updated_at}>
                {formatDate(post.updated_at)}
              </time>
            </p>
          </div>
          
          <ShareButtons title={post.title} />
        </div>
      </footer>
    </article>
  )
}
