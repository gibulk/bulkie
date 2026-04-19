'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiSearch, FiX } from 'react-icons/fi'

export default function SearchBar({ onClose }) {
  const [query, setQuery] = useState('')
  const router = useRouter()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/blog?search=${encodeURIComponent(query.trim())}`)
      onClose?.()
    }
  }
  
  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari artikel..."
            className="w-full px-4 py-2 pl-10 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bulkie-primary focus:border-transparent"
            autoFocus
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FiX />
            </button>
          )}
        </div>
        
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-bulkie-primary text-white rounded-lg hover:bg-bulkie-secondary transition-colors"
        >
          Cari
        </button>
        
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-2 p-2 text-gray-500 hover:text-gray-700"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}
      </form>
    </div>
  )
}
