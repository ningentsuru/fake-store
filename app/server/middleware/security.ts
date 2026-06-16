// server/middleware/security.ts
import { defineEventHandler, setHeader } from 'h3'

export default defineEventHandler((event) => {
  setHeader(event, 'X-Content-Type-Options', 'nosniff')
  setHeader(event, 'X-Frame-Options', 'DENY')
  setHeader(event, 'Referrer-Policy', 'strict-origin-when-cross-origin')
  setHeader(
    event,
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=()'
  )
  setHeader(
    event,
    'Content-Security-Policy',
    "default-src 'self'; frame-ancestors 'none'"
  )

  // Conditionally add HSTS
  if (process.env.NODE_ENV === 'production') {
    setHeader(
      event,
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    )
  }
})
