import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ToastProvider } from '@/context/ToastContext'
import { Toast } from '@/components/ui/Toast'

export const metadata = {
  title: 'ByteBites — Dishes worth cooking again',
  description: 'Discover, save and annotate recipes from a curated collection.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ToastProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toast />
        </ToastProvider>
      </body>
    </html>
  )
}
