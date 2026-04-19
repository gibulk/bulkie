   'use client'

import Link from 'next/link'
import { FiPlus } from 'react-icons/fi'

export default function AdminDashboardPage() {
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>
          Dashboard Bulkie
        </h1>
        <Link 
          href="/admin/posts/new"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#1a1a2e',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '8px',
            textDecoration: 'none'
          }}
        >
          <FiPlus />
          <span>Tulis Artikel</span>
        </Link>
      </div>
      
      <div style={{
        backgroundColor: '#4caf50',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>
          ✅ Login Berhasil!
        </h2>
        <p>Anda telah masuk ke dashboard admin Bulkie.</p>
        <p style={{ marginTop: '10px', fontSize: '14px', opacity: '0.9' }}>
          Selanjutnya: Setup database Supabase untuk mulai menulis artikel.
        </p>
      </div>
      
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
          Menu Cepat
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link 
            href="/admin/posts"
            style={{
              padding: '12px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#333'
            }}
          >
            📝 Manajemen Artikel
          </Link>
          <Link 
            href="/admin/posts/new"
            style={{
              padding: '12px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#333'
            }}
          >
            ✍️ Tulis Artikel Baru
          </Link>
          <Link 
            href="/admin/settings"
            style={{
              padding: '12px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#333'
            }}
          >
            ⚙️ Pengaturan
          </Link>
        </div>
      </div>
      
      <div style={{
        backgroundColor: '#fff3cd',
        border: '1px solid #ffc107',
        padding: '15px',
        borderRadius: '8px'
      }}>
        <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>
          ⚠️ Status Database
        </h4>
        <p style={{ fontSize: '14px' }}>
          Database belum terhubung atau tabel "posts" belum dibuat.
          <br />
          Silakan jalankan SQL setup di Supabase Dashboard.
        </p>
      </div>
    </div>
  )
            } 
