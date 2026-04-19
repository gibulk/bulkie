export const metadata = {
  title: 'Kebijakan Privasi - Bulkie',
  description: 'Kebijakan privasi Bulkie - bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
          Kebijakan Privasi
        </h1>
        <p className="text-gray-600 mb-8">
          Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
              1. Pendahuluan
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Selamat datang di Bulkie. Kami menghormati privasi Anda dan berkomitmen untuk melindungi 
              data pribadi Anda. Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, 
              menggunakan, dan melindungi informasi yang Anda berikan saat menggunakan situs web kami.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
              2. Informasi yang Kami Kumpulkan
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Kami mengumpulkan informasi dengan cara berikut:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Informasi yang Anda berikan:</strong> Saat Anda menghubungi kami melalui 
                formulir kontak atau berlangganan newsletter.
              </li>
              <li>
                <strong>Data penggunaan otomatis:</strong> Seperti alamat IP, jenis browser, 
                halaman yang dikunjungi, dan waktu kunjungan.
              </li>
              <li>
                <strong>Cookies:</strong> Untuk meningkatkan pengalaman browsing Anda.
              </li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
              3. Penggunaan Informasi
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Kami menggunakan informasi yang dikumpulkan untuk:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Menyediakan dan memelihara layanan kami</li>
              <li>Meningkatkan konten dan pengalaman pengguna</li>
              <li>Merespon pertanyaan dan permintaan Anda</li>
              <li>Mengirim pembaruan dan informasi yang relevan (jika Anda berlangganan)</li>
              <li>Menganalisis tren penggunaan situs</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
              4. Perlindungan Data
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Kami menerapkan langkah-langkah keamanan yang sesuai untuk melindungi data pribadi Anda 
              dari akses, perubahan, pengungkapan, atau perusakan yang tidak sah. Namun, perlu diingat 
              bahwa tidak ada metode transmisi melalui internet atau penyimpanan elektronik yang 100% aman.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
              5. Cookies
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Bulkie menggunakan cookies untuk meningkatkan pengalaman browsing Anda. Cookies adalah 
              file kecil yang disimpan di perangkat Anda. Anda dapat mengatur browser Anda untuk 
              menolak cookies, namun beberapa fitur situs mungkin tidak berfungsi dengan baik.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
              6. Tautan ke Situs Lain
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Situs kami mungkin berisi tautan ke situs web lain yang tidak dioperasikan oleh kami. 
              Kami tidak bertanggung jawab atas praktik privasi situs pihak ketiga dan mendorong Anda 
              untuk membaca kebijakan privasi mereka.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
              7. Perubahan Kebijakan
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan akan 
              diumumkan di halaman ini dengan tanggal pembaruan yang baru.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
              8. Hubungi Kami
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami di{' '}
              <a href="mailto:privacy@bulkie.com" className="text-bulkie-primary hover:text-bulkie-secondary">
                privacy@bulkie.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
                }
