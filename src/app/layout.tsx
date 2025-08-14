import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { DevNotification } from '@/components/ui/DevNotification'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: 'NgeVibeCoding - Bikin Website & App Bareng AI',
  description: 'Platform pembelajaran untuk bikin website dan app bareng AI. Dari pemula hingga bisa bikin produk digital sendiri.',
  keywords: 'website, app, AI, bikin app, coding, programming, Indonesia, UMKM, produk digital, ngevibecoding',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            {children}
            <DevNotification />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}