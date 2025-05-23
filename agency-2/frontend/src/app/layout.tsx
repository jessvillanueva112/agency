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
      <body
        className={
          `${inter.className} min-h-screen bg-tremor-background text-tremor-content dark:bg-dark-tremor-background dark:text-dark-tremor-content transition-colors duration-300`
        }
        style={{
          background: 'linear-gradient(135deg, var(--tremor-background-muted, #f9fafb) 0%, var(--tremor-background-subtle, #f3f4f6) 100%)',
        }}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex flex-col items-center justify-start px-4 py-8 sm:px-8 md:px-16 lg:px-32">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
