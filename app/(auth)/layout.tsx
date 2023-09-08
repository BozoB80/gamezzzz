import { ClerkProvider } from "@clerk/nextjs"
import { Anek_Gujarati } from 'next/font/google'

import "../globals.css";

const font = Anek_Gujarati({ subsets: ['latin'] })

export const metadata = {
  title: 'Gamezzzz | Auth',
  description: 'Authorize yourself',
}

export default function AuthLayout({children,}: {children: React.ReactNode}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${font.className}`}>
          <div className="w-full flex justify-center items-center min-h-screen">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
