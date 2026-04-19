'use client'

import AdminNav from '../components/AdminNav'
import { Toaster } from 'react-hot-toast'

export default function AdminLayout({ children }) {
  // BYPASS - Tidak ada auth check untuk sementara
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
