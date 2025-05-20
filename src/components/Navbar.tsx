"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold" style={{ color: '#8dd3ba' }}>
          Equipaje Inteligente
        </Link>
        <div className="space-x-4">
          <Link
            href="/"
            className="text-gray-800 hover:text-[#76bfa9] transition-colors duration-200"
          >
            Inicio
          </Link>
          <Link
            href="/equipaje"
            className="text-gray-800 hover:text-[#76bfa9] transition-colors duration-200"
          >
            Generar Equipaje
          </Link>
          <Link
            href="/historial"
            className="text-gray-800 hover:text-[#76bfa9] transition-colors duration-200"
          >
            Historial
          </Link>
          <Link
            href="/login"
            className="text-gray-800 hover:text-[#76bfa9] transition-colors duration-200"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  )
}
