'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import AdminNav from '../components/AdminNav'
import { Toaster } from 'react-hot-toast'
import { supabase } from '../lib/supabase'

export default function AdminLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session) {
          setIsAuthenticated(true)
          if (pathname === '/admin/login') {
            router.push('/admin/dashboard')
          }
        } else {
          setIsAuthenticated(false)
          if (pathname !== '/admin/login') {
            router.push('/admin/login')
          }
        }
      } catch (error) {
        console.error('Auth check error:', error)
        setIsAuthenticated(false)
        if (pathname !== '/admin/login') {
          router.push('/admin/login')
        }
      } finally {
        setIsLoading(false)
      }
    }
    
    checkAuth()
  }, [pathname, router])
  
  // Setup auth state listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setIsAuthenticated(true)
        if (pathname === '/admin/login') {
          router.push('/admin/dashboard')
        }
      }
      if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false)
        router.push('/admin/login')
      }
    })
    
    return () => subscription.unsubscribe()
  }, [router, pathname])
  
  // Show loading state
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
  
  // Don't show admin nav on login page
  if (pathname === '/admin/login') {
    return (
      <>
        <Toaster position="top-right" />
        {children}
      </>
    )
  }
  
  // If authenticated, show admin layout
  if (isAuthenticated) {
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
  
  // Fallback loading
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-bulkie-primary border-r-transparent"></div>
      </div>
    </div>
  )
      }
