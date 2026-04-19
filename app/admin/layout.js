'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminNav from '../components/AdminNav'
import { Toaster } from 'react-hot-toast'
import { supabase } from '../lib/supabase'

export default function AdminLayout({ children }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          // Redirect ke halaman login baru
          router.replace('/login')
        }
      } catch (error) {
        console.error('Auth check error:', error)
        router.replace('/login')
      } finally {
        setIsLoading(false)
      }
    }
    
    checkAuth()
  }, [router])
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-bulkie-primary border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Memeriksa autentikasi...</p>
        </div>
      </div>
    )
  }
  
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
