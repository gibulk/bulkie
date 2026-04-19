'use client'

import { useState } from 'react'
import { FiMail, FiMapPin, FiSend } from 'react-icons/fi'
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulasi pengiriman (bisa diganti dengan API endpoint)
    setTimeout(() => {
      toast.success('Pesan berhasil dikirim! Terima kasih telah menghubungi kami.')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      setLoading(false)
    }, 1500)
  }
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
          Hubungi Kami
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Ada pertanyaan, saran, atau ingin berkolaborasi? Kami senang mendengar dari Anda.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
              Informasi Kontak
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <FiMail className="w-5 h-5 text-bulkie-primary mt-1 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <a 
                    href="mailto:contact@bulkie.com" 
                    className="text-gray-600 hover:text-bulkie-primary"
                  >
                    contact@bulkie.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <FiMapPin className="w-5 h-5 text-bulkie-primary mt-1 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Lokasi</p>
                  <p className="text-gray-600">
                    Jakarta, Indonesia
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
              Media Sosial
            </h3>
            
            <div className="space-y-3">
              <a 
                href="https://twitter.com/bulkie" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-blue-400 transition-colors"
              >
                <FaTwitter className="w-5 h-5 mr-3" />
                <span>@bulkie</span>
              </a>
              
              <a 
                href="https://github.com/bulkie" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FaGithub className="w-5 h-5 mr-3" />
                <span>/bulkie</span>
              </a>
              
              <a 
                href="https://linkedin.com/company/bulkie" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-blue-700 transition-colors"
              >
                <FaLinkedin className="w-5 h-5 mr-3" />
                <span>/company/bulkie</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
              Kirim Pesan
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bulkie-primary focus:border-transparent"
                    placeholder="Nama Anda"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bulkie-primary focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subjek *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bulkie-primary focus:border-transparent"
                  placeholder="Subjek pesan"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Pesan *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bulkie-primary focus:border-transparent resize-none"
                  placeholder="Tulis pesan Anda di sini..."
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center w-full md:w-auto px-6 py-3 bg-bulkie-primary text-white rounded-md hover:bg-bulkie-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  'Mengirim...'
                ) : (
                  <>
                    <FiSend className="mr-2" />
                    Kirim Pesan
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
    }
