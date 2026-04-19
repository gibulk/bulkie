import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-bulkie-primary mb-4">404</h1>
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Maaf, halaman yang Anda cari tidak ditemukan atau telah dipindahkan.
        </p>
        <Link
          href="/"
          className="inline-block bg-bulkie-primary text-white px-6 py-3 rounded-lg hover:bg-bulkie-secondary transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}
