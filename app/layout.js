import { Inter } from 'next/font/google'
import './styles/globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bulkie - Analisis Mendalam Ekonomi, Geopolitik & Sains',
  description: 'Platform blog analitis yang menyajikan perspektif mendalam tentang ekonomi global, geopolitik, geografi, dan sains teknologi.',
  keywords: 'blog, analisis, ekonomi, geopolitik, geografi, sains, teknologi, bulki',
  authors: [{ name: 'Bulkie' }],
  openGraph: {
    title: 'Bulkie - Analisis Mendalam',
    description: 'Platform blog analitis yang menyajikan perspektif mendalam tentang ekonomi global, geopolitik, geografi, dan sains teknologi.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'Bulkie',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bulkie - Analisis Mendalam',
    description: 'Platform blog analitis yang menyajikan perspektif mendalam',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
