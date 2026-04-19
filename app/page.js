import { db } from './lib/supabase'
import HeroSection from './components/HeroSection'
import BlogCard from './components/BlogCard'
import CategoryNav from './components/CategoryNav'
import Link from 'next/link'

export const revalidate = 3600 // Revalidate setiap jam

export default async function Home() {
  const { data: recentPosts } = await db.getPosts({ limit: 6 })
  const { data: ekonomiPosts } = await db.getPostsByCategory('Ekonomi Global', 3)
  const { data: geopolitikPosts } = await db.getPostsByCategory('Geopolitik', 3)
  const { data: geografiPosts } = await db.getPostsByCategory('Geografi', 3)
  const { data: sainsPosts } = await db.getPostsByCategory('Sains dan Teknologi', 3)

  const categories = [
    { name: 'Ekonomi Global', posts: ekonomiPosts, color: 'blue' },
    { name: 'Geopolitik', posts: geopolitikPosts, color: 'red' },
    { name: 'Geografi', posts: geografiPosts, color: 'green' },
    { name: 'Sains dan Teknologi', posts: sainsPosts, color: 'purple' }
  ]

  return (
    <div className="space-y-12">
      <HeroSection />
      
      <CategoryNav />
      
      {/* Artikel Terbaru */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-serif font-bold text-gray-900">
            Artikel Terbaru
          </h2>
          <Link 
            href="/blog" 
            className="text-bulkie-primary hover:text-bulkie-secondary font-medium"
          >
            Lihat Semua →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts?.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
      
      {/* Kategori Unggulan */}
      {categories.map((category) => (
        category.posts && category.posts.length > 0 && (
          <section key={category.name}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-serif font-bold text-gray-900">
                {category.name}
              </h2>
              <Link 
                href={`/blog/category/${encodeURIComponent(category.name)}`}
                className="text-bulkie-primary hover:text-bulkie-secondary font-medium"
              >
                Lihat Semua →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {category.posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )
      ))}
    </div>
  )
                  }
