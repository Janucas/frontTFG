"use client"

import React, { useState } from "react"
import Link from "next/link"
import Footer from "@/components/Footer"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login:", { email, password })
  }

  return (
    <>
      <section
        className="py-20 px-4 min-h-screen flex justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/peru.jpg')" }}
      >
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-[#8dd3ba] mb-6">
            Iniciar sesión
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 text-gray-700 font-medium">
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
              <label htmlFor="password" className="mb-2 text-gray-700 font-medium">
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
              Entrar
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="text-[#8dd3ba] hover:text-[#1a1a1a] font-medium">
              Regístrate
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}
