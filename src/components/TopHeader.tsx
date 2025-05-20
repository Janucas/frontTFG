"use client"

import Link from "next/link"
import { Briefcase } from "lucide-react"

export default function TopHeader() {
  return (
    <header className="relative z-50">
      {/* Mensaje superior */}
      <div className="bg-green-950 text-white text-sm text-center py-2 px-4">
        Esta web aún está en desarrollo. Algunas funciones pueden no estar disponibles. {/* Revisa el avance en{" "}
        <a
          href="https://github.com/tu-repo"
          target="_blank"
          className="text-red-400 underline hover:text-red-300"
        >
          este repositorio
        </a>. */}
      </div>

      {/* Barra principal con efecto blur */}
      <div className="backdrop-blur-md bg-white/70 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center relative">
          {/* IZQUIERDA: Generar equipaje */}
          <div className="flex items-center space-x-2">
            <Link
              href="/equipaje"
              className="flex items-center space-x-2 text-gray-800 font-medium hover:text-[#76bfa9] transition-colors"
            >
              <Briefcase size={18} />
              <span>Generar equipaje</span>
            </Link>
          </div>

          {/* CENTRO: Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="text-3xl font-bold" style={{ color: "#8dd3ba" }}>
              equipaje
            </Link>
          </div>

          {/* DERECHA: Historial, Login, Signup */}
          <div className="flex items-center space-x-4">
            <Link
              href="/historial"
              className="text-gray-800 font-medium hover:text-[#76bfa9] transition-colors"
            >
              Ver historial
            </Link>
            <Link
              href="/login"
              className="text-gray-800 font-medium hover:text-[#76bfa9] transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-white text-gray-800 border px-3 py-1.5 rounded-lg font-medium hover:text-[#76bfa9] hover:border-[#76bfa9] transition-colors"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
