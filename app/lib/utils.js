import slugify from 'slugify'
import readingTime from 'reading-time'

export function generateSlug(title) {
  return slugify(title, {
    lower: true,
    strict: true,
    locale: 'id'
  })
}

export function calculateReadingTime(content) {
  return readingTime(content)
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function truncateText(text, maxLength = 150) {
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength) + '...'
}

export function getCategoryColor(category) {
  const colors = {
    'Ekonomi Global': 'blue',
    'Geopolitik': 'red',
    'Geografi': 'green',
    'Sains dan Teknologi': 'purple'
  }
  return colors[category] || 'gray'
}

export function validateImageUrl(url) {
  if (!url) return '/images/placeholder.jpg'
  return url
}

export function generateMetaDescription(content, maxLength = 160) {
  const plainText = content.replace(/<[^>]*>/g, '')
  return truncateText(plainText, maxLength)
}
