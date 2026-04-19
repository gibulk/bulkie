'use client'

import AdminNav from '../components/AdminNav'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLayout({ children }) {
  const router = useRouter()
  
  useEffect(() => {
    // Cek token dari localStorage (disimpan oleh HTML login)
    const token = localStorage.getItem('sb-token')
    if (!token) {
      router.replace('/admin-login.html')
    }
  }, [router])
  
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Toaster position="top-right" />
    </div>
  )
}
