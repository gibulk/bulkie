'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import AdminNav from '../components/AdminNav'
import { Toaster } from 'react-hot-toast'

export default function AdminLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  
  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      const token = localStorage.getItem('admin_token')
      
      if (!token && pathname !== '/admin/login') {
        router.push('/admin/login')
      }
    }
    
    checkAuth()
  }, [pathname, router])
  
  // Don't show admin nav on login page
  if (pathname === '/admin/login') {
    return (
      <>
        <Toaster position="top-right" />
        {children}
      </>
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
