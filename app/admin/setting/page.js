'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { FiSave, FiUser, FiLock, FiGlobe } from 'react-icons/fi'

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)
  
  const [profileData, setProfileData] = useState({
    name: 'Admin Bulkie',
    email: 'admin@bulkie.com',
    bio: 'Penulis dan analis di Bulkie'
  })
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  const [siteData, setSiteData] = useState({
    siteName: 'Bulkie',
    siteDescription: 'Platform analisis mendalam tentang ekonomi, geopolitik, geografi, dan sains',
    postsPerPage: '10',
    enableComments: false
  })
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSiteChange = (e) => {
    const { name, value, type, checked } = e.target
    setSiteData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }))
  }
  
  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    setTimeout(() => {
      toast.success('Profil berhasil diperbarui')
      setLoading(false)
    }, 1000)
  }
  
  const handleSavePassword = async (e) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Password baru tidak cocok')
      return
    }
    
    if (passwordData.newPassword.length < 6) {
      toast.error('Password minimal 6 karakter')
      return
    }
    
    setLoading(true)
    
    setTimeout(() => {
      toast.success('Password berhasil diubah')
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      setLoading(false)
    }, 1000)
  }
  
  const handleSaveSite = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    setTimeout(() => {
      toast.success('Pengaturan situs berhasil disimpan')
      setLoading(false)
    }, 1000)
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Pengaturan</h1>
      
      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-bulkie-primary text-bulkie-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FiUser className="inline mr-2" />
              Profil
            </button>
            
            <button
              onClick={() => setActiveTab('password')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'password'
                  ? 'border-bulkie-primary text-bulkie-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FiLock className="inline mr-2" />
              Password
            </button>
            
            <button
              onClick={() => setActiveTab('site')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'site'
                  ? 'border-bulkie-primary text-bulkie-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FiGlobe className="inline mr-2" />
              Situs
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nama
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bulkie-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bulkie-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleProfileChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bulkie-primary focus:border-transparent"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center px-4 py-2 bg-bulkie-primary text-white rounded-md hover:bg-bulkie-secondary transition-colors disabled:opacity-50"
                  >
                    <FiSave className="mr-2" />
                    {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </button>
                </div>
              </div>
            </form>
          )}
          
          {/* Password Tab */}
          {activeTab === 'password' && (
            <form onSubmit={handleSavePassword}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Password Saat Ini
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bulkie-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Password Baru
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                    minLength="6"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bulkie-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Konfirmasi Password Baru
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                    minLength="6"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bulkie-primary focus:border-transparent"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center px-4 py-2 bg-bulkie-primary text-white rounded-md hover:bg-bulkie-secondary transition-colors disabled:opacity-50"
                  >
                    <FiSave className="mr-2" />
                    {loading ? 'Menyimpan...' : 'Ubah Password'}
                  </button>
                </div>
              </div>
            </form>
          )}
          
          {/* Site Settings Tab */}
          {activeTab === 'site' && (
            <form onSubmit={handleSaveSite}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Situs
                  </label>
                  <input
                    type="text"
                    id="siteName"
                    name="siteName"
                    value={siteData.siteName}
                    onChange={handleSiteChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bulkie-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Deskripsi Situs
                  </label>
                  <textarea
                    id="siteDescription"
                    name="siteDescription"
                    value={siteData.siteDescription}
                    onChange={handleSiteChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bulkie-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="postsPerPage" className="block text-sm font-medium text-gray-700 mb-1">
                    Artikel per Halaman
                  </label>
                  <select
                    id="postsPerPage"
                    name="postsPerPage"
                    value={siteData.postsPerPage}
                    onChange={handleSiteChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bulkie-primary focus:border-transparent"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enableComments"
                    name="enableComments"
                    checked={siteData.enableComments}
                    onChange={handleSiteChange}
                    className="h-4 w-4 text-bulkie-primary focus:ring-bulkie-primary border-gray-300 rounded"
                  />
                  <label htmlFor="enableComments" className="ml-2 block text-sm text-gray-700">
                    Aktifkan Komentar
                  </label>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center px-4 py-2 bg-bulkie-primary text-white rounded-md hover:bg-bulkie-secondary transition-colors disabled:opacity-50"
                  >
                    <FiSave className="mr-2" />
                    {loading ? 'Menyimpan...' : 'Simpan Pengaturan'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
    }
