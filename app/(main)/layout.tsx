import '../globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Anek_Gujarati } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import Navbar from '@/components/navbar/Navbar'
import { NextUiProvider } from '@/components/providers/NextUiProvider'

const font = Anek_Gujarati({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gamezzzz',
  description: 'Enjoy the ride',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <NextUiProvider>
            <Navbar />
            {children}
            </NextUiProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
