"use client"

import React, { useState } from "react"
import Link from "next/link"
import Footer from "@/components/Footer"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("") // Limpiar errores anteriores

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        if (response.status === 401) {
          setError("❌ El usuario no existe o la contraseña es incorrecta. Por favor, regístrate.")
        } else {
          setError("❌ Error al iniciar sesión. Inténtalo más tarde.")
        }
        return
      }

      const data = await response.json()
      localStorage.setItem("token", data.token)
      window.location.href = "/" // Redirigir al inicio
    } catch (err) {
      console.error(err)
      setError("❌ No se pudo conectar con el servidor.")
    }
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

          {error && (
            <div className="mb-4 p-3 text-sm text-red-600 bg-red-100 border border-red-300 rounded-lg">
              {error}
            </div>
          )}

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
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1a1a1a")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#8dd3ba")}
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
