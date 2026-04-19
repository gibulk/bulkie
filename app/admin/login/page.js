'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        if (error.message.includes('Invalid login')) {
          toast.error('Email atau password salah')
        } else {
          toast.error(error.message)
        }
        return
      }
      
      if (data.session) {
        toast.success('Login berhasil!')
        router.push('/admin/dashboard')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Terjadi kesalahan, coba lagi')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-bulkie-primary mb-6">
          Bulkie Admin
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bulkie-primary focus:border-transparent"
              placeholder="admin@bulkie.com"
              autoComplete="email"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bulkie-primary focus:border-transparent"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-bulkie-primary text-white py-2 px-4 rounded-md hover:bg-bulkie-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
        
        <p className="text-xs text-center text-gray-500 mt-6">
          Hanya untuk akses administrator
        </p>
      </div>
    </div>
  )
                }
