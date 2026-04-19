import Link from 'next/link'

export default function CategoryNav() {
  const categories = [
    { 
      name: 'Ekonomi Global', 
      icon: '📊', 
      description: 'Analisis pasar, kebijakan moneter, dan tren ekonomi dunia',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      name: 'Geopolitik', 
      icon: '🌍', 
      description: 'Dinamika kekuasaan, konflik, dan hubungan internasional',
      color: 'from-red-500 to-red-600'
    },
    { 
      name: 'Geografi', 
      icon: '🗺️', 
      description: 'Fenomena spasial, lingkungan, dan interaksi manusia-ruang',
      color: 'from-green-500 to-green-600'
    },
    { 
      name: 'Sains dan Teknologi', 
      icon: '🔬', 
      description: 'Inovasi terkini, penelitian, dan masa depan teknologi',
      color: 'from-purple-500 to-purple-600'
    }
  ]
  
  return (
    <section className="py-8">
      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center">
        Jelajahi Kategori
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/blog/category/${encodeURIComponent(category.name)}`}
            className="group"
          >
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 h-full border border-gray-100">
              <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {category.icon}
              </div>
              
              <h3 className="font-serif font-bold text-lg text-gray-900 mb-2 group-hover:text-bulkie-primary transition-colors">
                {category.name}
              </h3>
              
              <p className="text-sm text-gray-600">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
