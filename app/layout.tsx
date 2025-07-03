import type { Metadata } from 'next'
import '@/styles/globals.css'
import React from 'react'
import Providers from './providers'
import FontAwesomeSetup from '@/components/FontAwesomeSetup'

export const metadata: Metadata = {
  title: 'Phú Hưng Galaxy Foods - E-commerce',
  description: 'Chúng tôi tự hào là nhà cung cấp thực phẩm uy tín...',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans bg-[#FDFBF5]">
        <Providers>
          <FontAwesomeSetup />
          {children}
        </Providers>
      </body>
    </html>
  )
} 