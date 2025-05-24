import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Agency - AI Assistant for School Counselors',
  description: 'Intelligent assistant designed to help school counselors manage their workload efficiently.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className + ' bg-[#1a2234] text-white min-h-screen'}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="min-h-screen flex flex-col items-center justify-start px-4 py-8 sm:px-8 md:px-16 lg:px-32 w-full max-w-6xl mx-auto">
        {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}