import { db } from './lib/supabase'

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bulkie.vercel.app'
  
  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tentang`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kontak`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
  
  // Dynamic blog posts
  const { data: posts } = await db.getPosts({ limit: 1000 })
  
  const postRoutes = posts?.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at || post.created_at),
    changeFrequency: 'weekly',
    priority: 0.8,
  })) || []
  
  // Category routes
  const categories = [
    'Ekonomi Global',
    'Geopolitik',
    'Geografi',
    'Sains dan Teknologi'
  ]
  
  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/blog/category/${encodeURIComponent(category)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))
  
  return [...staticRoutes, ...categoryRoutes, ...postRoutes]
}
