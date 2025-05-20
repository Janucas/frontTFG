"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Footer from "@/components/Footer"

export default function RegisterPage() {
  const [nombre, setNombre] = useState("")
  const [dni, setDni] = useState("")
  const [fechaNacimiento, setFechaNacimiento] = useState("")
  const [telefono, setTelefono] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Registro:", {
      nombre,
      dni,
      fechaNacimiento,
      telefono,
      email,
      password,
    })

    router.push("/login")
  }

  return (
    <>
      <section
        className="py-20 px-4 min-h-screen flex justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/peru.jpg')" }}
      >
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-[#8dd3ba] mb-6">
            Crear cuenta
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="nombre" className="mb-2 text-[#8dd3ba] font-medium">
                Nombre completo
              </label>
              <input
                id="nombre"
                type="text"
                value={nombre}
                placeholder="Tu nombre"
                onChange={(e) => setNombre(e.target.value)}
                className="p-3 bg-white text-gray-700 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="dni" className="mb-2 text-[#8dd3ba] font-medium">
                DNI
              </label>
              <input
                id="dni"
                type="text"
                value={dni}
                placeholder="12345678A"
                onChange={(e) => setDni(e.target.value)}
                className="p-3 bg-white text-gray-700 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="fechaNacimiento" className="mb-2 text-[#8dd3ba] font-medium">
                Fecha de nacimiento
              </label>
              <input
                id="fechaNacimiento"
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                className="p-3 bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="telefono" className="mb-2 text-[#8dd3ba] font-medium">
                Teléfono
              </label>
              <input
                id="telefono"
                type="tel"
                value={telefono}
                placeholder="+34 600 000 000"
                onChange={(e) => setTelefono(e.target.value)}
                className="p-3 bg-white text-gray-700 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 text-[#8dd3ba] font-medium">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                placeholder="ejemplo@email.com"
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 bg-white text-gray-700 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="mb-2 text-[#8dd3ba] font-medium">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 bg-white text-gray-700 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 mt-4 rounded-lg text-white font-medium transition-colors duration-300"
              style={{ backgroundColor: "#8dd3ba" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#1a1a1a")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#8dd3ba")
              }
            >
              Registrarse
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-[#8dd3ba] hover:text-[#1a1a1a] font-medium">
              Inicia sesión
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}
