import Link from "next/link"

export default async function Navbar() {


  return (
    <nav className="bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold py-4">
              Hop in, <span className="block">Morris!</span> 
            </Link>
            <Link href="/" className="hover:text-red-600">
              Home
            </Link>
            <Link href="/analytics" className="hover:text-red-600">
              Analytics
            </Link>
            <Link href="/chat" className="hover:text-blue-600">
            Chat
            </Link>
            <Link href="/register" className="hover:text-blue-600">
            Signup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}