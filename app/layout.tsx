import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { ConditionalTopNavbar } from '@/components/layout/conditional-top-navbar'

export const metadata: Metadata = {
  title: 'Bumara Compliance',
  description: 'Created for Bumara',
  generator: 'Bumara Compliance',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body suppressHydrationWarning>
        <div className="flex h-screen flex-col bg-background text-foreground">
          <ConditionalTopNavbar />
          <div className="flex flex-1 overflow-hidden">{children}</div>
        </div>
      </body>
    </html>
  )
}
