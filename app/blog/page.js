import { db } from '../lib/supabase'
import BlogCard from '../components/BlogCard'
import SearchBar from '../components/SearchBar'

export const revalidate = 3600

export default async function BlogPage({ searchParams }) {
  const search = searchParams?.search || ''
  const category = searchParams?.category || ''
  
  let posts = []
  
  if (search) {
    const { data } = await db.searchPosts(search)
    posts = data || []
  } else if (category) {
    const { data } = await db.getPostsByCategory(category, 50)
    posts = data || []
  } else {
    const { data } = await db.getPosts({ limit: 50 })
    posts = data || []
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
          {search ? `Hasil Pencarian: "${search}"` : 
           category ? `Kategori: ${category}` : 
           'Semua Artikel'}
        </h1>
        
        <div className="max-w-2xl">
          <SearchBar />
        </div>
      </div>
      
      {posts.length > 0 ? (
        <>
          <p className="text-gray-600 mb-6">
            Ditemukan {posts.length} artikel
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">
            Tidak ada artikel yang ditemukan.
          </p>
        </div>
      )}
    </div>
  )
}
