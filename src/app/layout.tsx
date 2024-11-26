// app/layout.tsx
import { Inter } from "next/font/google"
import Navbar from "@/components/NavBar"
// import AuthProvider from "@/components/AuthProvider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <AuthProvider> */}
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        {/* </AuthProvider> */}
      </body>
    </html>
  )
}