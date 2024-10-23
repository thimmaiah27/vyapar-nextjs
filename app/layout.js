import Script from 'next/script';
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Vyapar',
  description: 'Vyapar chat application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script src="https://kit.fontawesome.com/f33568eb55.js" crossOrigin="anonymous" strategy="lazyOnload"></Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}