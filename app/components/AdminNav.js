'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { FiHome, FiFileText, FiLogOut, FiSettings } from 'react-icons/fi'

export default function AdminNav() {
  const router = useRouter()
  const pathname = usePathname()
  
  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }
  
  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: FiHome },
    { name: 'Artikel', href: '/admin/posts', icon: FiFileText },
    { name: 'Pengaturan', href: '/admin/settings', icon: FiSettings },
  ]
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/admin/dashboard" className="text-xl font-bold text-bulkie-primary">
              Bulkie Admin
            </Link>
            
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-bulkie-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <FiLogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
