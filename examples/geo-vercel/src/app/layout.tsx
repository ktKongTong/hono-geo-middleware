import './globals.css'
import { Inter } from 'next/font/google'

export const metadata = {
  metadataBase: new URL('https://geo-vercel-blond.vercel.app'),
  title: 'hono geo middleware',
  description: 'geo middleware for hono.js',
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={inter.variable}>{children}</body>
    </html>
  )
}