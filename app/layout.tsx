import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Warzone Meta | Gaming Leaderboard and Statistics',
  description: 'Stay ahead in Warzone with our up-to-date meta analysis, weapon stats, and pro strategies. Dominate the battlefield with insider tips and tricks.',
  keywords: 'Warzone, meta, gaming leaderboard, weapon stats, Call of Duty, battle royale',
  openGraph: {
    title: 'Warzone Meta | Gaming Leaderboard and Statistics',
    description: 'Stay ahead in Warzone with our up-to-date meta analysis, weapon stats, and pro strategies.',
    type: 'website',
    url: 'https://wzmeta.io',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Warzone Meta Gaming Leaderboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Warzone Meta | Gaming Leaderboard and Statistics',
    description: 'Stay ahead in Warzone with our up-to-date meta analysis, weapon stats, and pro strategies.',
    images: ['/twitter-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground`}>{children}</body>
    </html>
  )
}