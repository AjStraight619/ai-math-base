import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import ActiveSectionContextProvider from '@/context/active-section-context'
import AuthProvider from '@/providers/auth-provider'
import SidebarFetcher from '@/components/navigation/sidebar/sidebar-fetcher'
import SidebarPresenceProvider from '@/context/sidebar-presence-context'
import { Toaster } from '@/components/ui/toaster'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-poppins',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Math Base',
  description:
    'An AI math learning platform that leverage GPT-4 and Wolfram Alpha',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <html className="!scroll-smooth" lang="en" suppressHydrationWarning>
        <head />
        <body className={`${inter.className} ${poppins.variable} `}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <ActiveSectionContextProvider>
                <SidebarPresenceProvider>
                  <SidebarFetcher />
                  <div className="min-h-screen antialiased">{children}</div>
                  <Toaster />
                </SidebarPresenceProvider>
              </ActiveSectionContextProvider>
            </AuthProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
