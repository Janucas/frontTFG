"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"

export default function EquipajePage() {
  const [destino, setDestino] = useState("")
  const [inicio, setInicio] = useState("")
  const [fin, setFin] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const token = localStorage.getItem("token")
    if (!token) {
      setError("❌ Debes iniciar sesión para generar equipaje")
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/equipajes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          destino,
          fechaInicio: inicio,
          fechaFin: fin,
        }),
      })

      if (!response.ok) {
        throw new Error("No se pudo generar el equipaje")
      }

      // Redirige al historial
      router.push("/historial")
    } catch (err) {
      console.error(err)
      setError("❌ Error al generar el equipaje")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-12 px-4 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Genera tu equipaje personalizado
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end"
        >
          {/* Destino */}
          <div className="flex flex-col">
            <label htmlFor="destino" className="mb-2 text-gray-700 font-medium">
              Destino
            </label>
            <input
              id="destino"
              type="text"
              placeholder="Ej. Roma"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              className="w-full p-3 bg-white text-gray-700 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Fecha inicio */}
          <div className="flex flex-col">
            <label htmlFor="inicio" className="mb-2 text-gray-700 font-medium">
              Fecha de inicio
            </label>
            <input
              id="inicio"
              type="date"
              value={inicio}
              onChange={(e) => setInicio(e.target.value)}
              className="w-full p-3 bg-white text-gray-700 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Fecha de fin */}
          <div className="flex flex-col">
            <label htmlFor="fin" className="mb-2 text-gray-700 font-medium">
              Fecha de vuelta
            </label>
            <input
              id="fin"
              type="date"
              value={fin}
              onChange={(e) => setFin(e.target.value)}
              className="w-full p-3 bg-white text-gray-700 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Botón */}
          <div className="md:col-span-3 flex flex-col">
            <label className="mb-2 text-transparent select-none">Enviar</label>
            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 rounded-lg text-white font-medium transition-colors duration-300 disabled:opacity-50"
              style={{ backgroundColor: "#8dd3ba" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#76bfa9")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#8dd3ba")
              }
            >
              {loading ? "Generando..." : "Generar equipaje"}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
