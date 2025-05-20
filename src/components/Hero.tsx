"use client"

import React from "react"
import Link from "next/link"
import { Briefcase } from "lucide-react"

const Hero: React.FC = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center text-center">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/thailandia.jpg" // 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Capa oscura por encima de la imagen */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Contenido del hero */}
      <div className="relative z-20 text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
          Planifica tu viaje de forma inteligente
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow">
          Descubre qué llevar en tu equipaje según el clima y la duración de tu viaje.
        </p>
        <Link
          href="/equipaje"
          className="inline-flex items-center space-x-2 bg-[#8dd3ba] hover:bg-[#76bfa9] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          <Briefcase size={20} />
          <span>Generar equipaje</span>
        </Link>
      </div>
    </section>
  )
}

export default Hero
