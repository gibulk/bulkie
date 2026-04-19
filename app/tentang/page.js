import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Tentang Bulkie - Platform Analisis Mendalam',
  description: 'Bulkie adalah platform blog analitis yang menyajikan perspektif mendalam tentang ekonomi global, geopolitik, geografi, dan sains teknologi.',
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
          Tentang <span className="text-bulkie-primary">Bulkie</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Ruang refleksi dan analisis kritis untuk memahami kompleksitas dunia modern
        </p>
      </section>
      
      {/* Mission Section */}
      <section className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
          Misi Kami
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Di tengah derasnya arus informasi yang seringkali dangkal dan terfragmentasi, 
          Bulkie hadir sebagai oasis bagi mereka yang mendambakan pemahaman yang lebih dalam. 
          Kami percaya bahwa untuk memahami dunia yang semakin kompleks, diperlukan analisis 
          yang tajam, kontekstual, dan berbasis data.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Misi kami sederhana namun ambisius: menyajikan perspektif yang mencerahkan tentang 
          isu-isu krusial yang membentuk dunia kita - dari dinamika ekonomi global, pergeseran 
          kekuasaan geopolitik, kompleksitas geografi manusia, hingga revolusi sains dan teknologi.
        </p>
      </section>
      
      {/* Focus Areas */}
      <section className="mb-8">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center">
          Fokus Analisis Kami
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
              Ekonomi Global
            </h3>
            <p className="text-gray-700">
              Analisis mendalam tentang tren pasar, kebijakan moneter, perdagangan internasional, 
              dan dinamika ekonomi yang mempengaruhi kehidupan kita sehari-hari.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6">
            <div className="text-3xl mb-3">🌍</div>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
              Geopolitik
            </h3>
            <p className="text-gray-700">
              Memahami pergeseran kekuasaan global, konflik internasional, diplomasi, 
              dan strategi negara-negara besar dalam panggung dunia.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
            <div className="text-3xl mb-3">🗺️</div>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
              Geografi
            </h3>
            <p className="text-gray-700">
              Eksplorasi hubungan antara manusia dan ruang, fenomena lingkungan, 
              demografi, dan bagaimana geografi membentuk peradaban.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
            <div className="text-3xl mb-3">🔬</div>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
              Sains & Teknologi
            </h3>
            <p className="text-gray-700">
              Mengupas inovasi terkini, terobosan ilmiah, dan implikasi teknologi 
              terhadap masyarakat dan masa depan umat manusia.
            </p>
          </div>
        </div>
      </section>
      
      {/* Approach Section */}
      <section className="bg-bulkie-primary text-white rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-serif font-bold mb-4">
          Pendekatan Kami
        </h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <span className="text-2xl mr-4">✓</span>
            <div>
              <h4 className="font-semibold text-lg">Berbasis Data</h4>
              <p className="text-gray-300">
                Setiap analisis didukung oleh data dan fakta yang dapat diverifikasi.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-2xl mr-4">✓</span>
            <div>
              <h4 className="font-semibold text-lg">Kontekstual</h4>
              <p className="text-gray-300">
                Kami menempatkan setiap isu dalam konteks historis dan sistemik yang lebih luas.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-2xl mr-4">✓</span>
            <div>
              <h4 className="font-semibold text-lg">Interdisipliner</h4>
              <p className="text-gray-300">
                Melihat masalah dari berbagai sudut pandang disiplin ilmu.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-2xl mr-4">✓</span>
            <div>
              <h4 className="font-semibold text-lg">Aksesibel</h4>
              <p className="text-gray-300">
                Menyajikan analisis kompleks dalam bahasa yang dapat dipahami.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="text-center py-8">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
          Mulai Menjelajahi
        </h2>
        <p className="text-gray-600 mb-6">
          Temukan artikel-artikel yang memperkaya wawasan dan membuka perspektif baru.
        </p>
        <Link
          href="/blog"
          className="inline-block bg-bulkie-primary text-white px-8 py-3 rounded-lg hover:bg-bulkie-secondary transition-colors"
        >
          Jelajahi Artikel
        </Link>
      </section>
    </div>
  )
            }
