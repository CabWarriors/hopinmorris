import Link from "next/link"
// import { getServerSession } from "next-auth"
// import { SignInButton } from "./auth/SignInButton"
// import { SignOutButton } from "./auth/SignOutButton"

export default async function Navbar() {
//   const session = await getServerSession()

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold">
              HopInMorris
            </Link>
            <Link href="/" className="hover:text-red-600">
              Home
            </Link>
            <Link href="/chat" className="hover:text-blue-600">
            Chat
            </Link>
            <Link href="/login" className="hover:text-blue-600">
            Login
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