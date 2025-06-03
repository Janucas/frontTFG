"use client"

import Link from "next/link"
import Image from "next/image"
import { Briefcase } from "lucide-react"
import { useEffect, useState } from "react"

export default function TopHeader() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const token = localStorage.getItem("token")
    const user = localStorage.getItem("username")
    setLoggedIn(!!token)
    setUsername(user || "")

    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token")
      const newUser = localStorage.getItem("username")
      setLoggedIn(!!newToken)
      setUsername(newUser || "")
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    setLoggedIn(false)
    setUsername("")
    window.location.href = "/login"
  }

  if (!isClient) return null

  return (
    <header className="relative z-50">
      <div className="bg-green-950 text-white text-sm text-center py-2 px-4">
        Esta web aún está en desarrollo. Algunas funciones pueden no estar disponibles.
      </div>

      <div className="bg-white/70 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:justify-between md:items-center relative gap-y-4">
          
          {/* Logo para móviles */}
          <div className="flex justify-center md:hidden">
            <Link href="/">
              <Image
                src="/images/travelguru.png"
                alt="Logo"
                width={150}
                height={50}
                className="object-contain h-12"
                priority
              />
            </Link>
          </div>

          {/* Sección izquierda */}
          <div className="flex items-center space-x-4 justify-center md:justify-start">
            <Link
              href="/equipaje"
              className="flex items-center space-x-2 text-gray-800 font-medium hover:text-[#76bfa9] transition-colors duration-200"
            >
              <Briefcase size={18} />
              <span>Generar equipaje</span>
            </Link>
          </div>

          {/* Logo centrado absoluto en escritorio */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <Link href="/">
              <Image
                src="/images/travelguru.png"
                alt="Logo"
                width={150}
                height={50}
                className="object-contain h-12"
                priority
              />
            </Link>
          </div>

          {/* Sección derecha */}
          <div className="flex items-center space-x-4 justify-center md:justify-end">
            {!loggedIn ? (
              <>
                <Link href="/login" className="text-gray-800 hover:text-[#76bfa9] transition-colors duration-200">
                  Login
                </Link>
                <Link href="/register" className="text-gray-800 hover:text-[#76bfa9] transition-colors duration-200">
                  Signup
                </Link>
              </>
            ) : (
              <>
                <Link href="/historial" className="text-gray-800 hover:text-[#76bfa9] transition-colors duration-200">
                  Historial
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 font-semibold hover:text-red-800 transition-colors duration-200"
                >
                  Logout
                </button>
                <span className="text-gray-700 font-medium">👋 Hola, {username}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
