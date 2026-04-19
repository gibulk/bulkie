import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-bulkie-primary via-bulkie-secondary to-bulkie-accent rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <div className="relative px-6 py-16 md:py-24 lg:py-32 text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 max-w-4xl mx-auto leading-tight">
          Memahami Dunia Melalui{' '}
          <span className="text-bulkie-light">Analisis</span> yang{' '}
          <span className="text-bulkie-light">Mendalam</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Bulkie hadir sebagai ruang refleksi dan analisis kritis tentang ekonomi global, 
          dinamika geopolitik, kompleksitas geografi, dan revolusi sains-teknologi.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/blog"
            className="bg-white text-bulkie-primary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Mulai Membaca
          </Link>
          <Link
            href="/tentang"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-bulkie-primary transition-colors"
          >
            Tentang Bulkie
          </Link>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
          <div>
            <div className="text-3xl font-bold">4</div>
            <div className="text-sm text-gray-300">Kategori Utama</div>
          </div>
          <div>
            <div className="text-3xl font-bold">100+</div>
            <div className="text-sm text-gray-300">Artikel Analisis</div>
          </div>
          <div>
            <div className="text-3xl font-bold">10K+</div>
            <div className="text-sm text-gray-300">Pembaca Bulanan</div>
          </div>
        </div>
      </div>
    </section>
  )
}
