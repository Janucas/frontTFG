"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"

const SearchForm: React.FC = () => {
  const [destino, setDestino] = useState("")
  const [fechaInicio, setFechaInicio] = useState("")
  const [fechaFin, setFechaFin] = useState("")
  const [mensaje, setMensaje] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const token = localStorage.getItem("token")
    if (!token) {
      setMensaje("❌ Debes iniciar sesión para generar un equipaje")
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
          fechaInicio,
          fechaFin,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        setMensaje(`❌ Error al generar el equipaje: ${errorText}`)
        return
      }

      // ✅ Redirigir directamente al historial tras crear el equipaje
      router.push("/historial")
    } catch (error) {
      console.error(error)
      setMensaje("❌ Error de conexión con el servidor")
    }
  }

  return (
    <section className="py-12 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Descubre el clima de tu viaje
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="destino" className="mb-2 text-gray-700 font-medium">
              Destino
            </label>
            <input
              id="destino"
              type="text"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              placeholder="Ej. París"
              className="w-full p-3 bg-white text-gray-800 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="fecha-inicio" className="mb-2 text-gray-700 font-medium">
              Fecha de inicio
            </label>
            <input
              id="fecha-inicio"
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="fecha-fin" className="mb-2 text-gray-700 font-medium">
              Fecha de vuelta
            </label>
            <input
              id="fecha-fin"
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-transparent select-none">Generar</label>
            <button
              type="submit"
              className="w-full p-3 rounded-lg text-white font-medium transition-colors duration-300"
              style={{ backgroundColor: "#8dd3ba" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#76bfa9")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#8dd3ba")
              }
            >
              Buscar
            </button>
          </div>
        </form>

        {mensaje && (
          <div className="mt-6 text-center text-md font-medium text-red-600">
            {mensaje}
          </div>
        )}
      </div>
    </section>
  )
}

export default SearchForm
