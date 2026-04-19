'use client'

import { FiTwitter, FiFacebook, FiLinkedin, FiLink } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function ShareButtons({ title, url }) {
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const shareTitle = title || 'Baca artikel menarik di Bulkie'
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  }
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast.success('Link berhasil disalin!')
    } catch (err) {
      toast.error('Gagal menyalin link')
    }
  }
  
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600 mr-2">Bagikan:</span>
      
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
        aria-label="Share to Twitter"
      >
        <FiTwitter className="w-4 h-4" />
      </a>
      
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        aria-label="Share to Facebook"
      >
        <FiFacebook className="w-4 h-4" />
      </a>
      
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
        aria-label="Share to LinkedIn"
      >
        <FiLinkedin className="w-4 h-4" />
      </a>
      
      <button
        onClick={copyToClipboard}
        className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
        aria-label="Copy link"
      >
        <FiLink className="w-4 h-4" />
      </button>
    </div>
  )
}
