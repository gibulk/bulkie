# Bulkie Blog Platform

Platform blog analitis full-stack untuk konten mendalam tentang ekonomi global, geopolitik, geografi, dan sains teknologi.

## Fitur Utama

### Frontend (Pembaca)
- ✅ Beranda dengan hero section dan artikel terbaru
- ✅ Navigasi berdasarkan kategori
- ✅ Pencarian artikel
- ✅ Halaman artikel dengan tampilan optimal
- ✅ Estimasi waktu baca
- ✅ Share buttons ke media sosial
- ✅ Responsive design (mobile-first)
- ✅ SEO optimized

### Admin Panel
- ✅ Sistem autentikasi
- ✅ Dashboard dengan statistik
- ✅ CRUD artikel (Create, Read, Update, Delete)
- ✅ Rich Text Editor (Tiptap)
- ✅ Manajemen status (Draft/Published)
- ✅ Upload gambar cover

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Rich Text Editor**: Tiptap
- **Icons**: React Icons
- **Deployment**: Vercel

## Setup Supabase

1. Buat project baru di [Supabase](https://supabase.com)
2. Jalankan SQL berikut di SQL Editor:

```sql
-- Tabel Posts
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  category TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  reading_time INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel Categories
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (name, slug) VALUES
  ('Ekonomi Global', 'ekonomi-global'),
  ('Geopolitik', 'geopolitik'),
  ('Geografi', 'geografi'),
  ('Sains dan Teknologi', 'sains-dan-teknologi');

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Policies untuk public read access
CREATE POLICY "Public can read published posts" ON posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can read categories" ON categories
  FOR SELECT USING (true);

-- Policies untuk admin full access
CREATE POLICY "Admin can do anything with posts" ON posts
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can do anything with categories" ON categories
  USING (auth.role() = 'authenticated');
