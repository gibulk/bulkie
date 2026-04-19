'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])
  
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
          Terjadi Kesalahan
        </h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Maaf, terjadi kesalahan saat memuat halaman. Silakan coba lagi.
        </p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="inline-block bg-bulkie-primary text-white px-6 py-3 rounded-lg hover:bg-bulkie-secondary transition-colors"
          >
            Coba Lagi
          </button>
          <Link
            href="/"
            className="inline-block border border-bulkie-primary text-bulkie-primary px-6 py-3 rounded-lg hover:bg-bulkie-primary hover:text-white transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}
