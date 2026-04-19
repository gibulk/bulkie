import Link from 'next/link'
import { FiTwitter, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-bulkie-primary text-white mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif font-bold mb-4">Bulkie</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Platform analisis mendalam tentang ekonomi global, geopolitik, geografi, 
              dan sains teknologi. Menyajikan perspektif yang tajam dan berbasis data.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FiGithub className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FiMail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Kategori</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog/category/Ekonomi%20Global" className="text-gray-300 hover:text-white transition-colors">
                  Ekonomi Global
                </Link>
              </li>
              <li>
                <Link href="/blog/category/Geopolitik" className="text-gray-300 hover:text-white transition-colors">
                  Geopolitik
                </Link>
              </li>
              <li>
                <Link href="/blog/category/Geografi" className="text-gray-300 hover:text-white transition-colors">
                  Geografi
                </Link>
              </li>
              <li>
                <Link href="/blog/category/Sains%20dan%20Teknologi" className="text-gray-300 hover:text-white transition-colors">
                  Sains & Teknologi
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Info */}
          <div>
            <h4 className="font-semibold mb-4">Informasi</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tentang" className="text-gray-300 hover:text-white transition-colors">
                  Tentang
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="text-gray-300 hover:text-white transition-colors">
                  Kontak
                </Link>
              </li>
              <li>
                <Link href="/privasi" className="text-gray-300 hover:text-white transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Bulkie. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  )
    }
