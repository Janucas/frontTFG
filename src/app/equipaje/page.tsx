"use client"

import React, { useState } from "react"

export default function EquipajePage() {
  const [destino, setDestino] = useState("")
  const [inicio, setInicio] = useState("")
  const [fin, setFin] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ destino, inicio, fin })
  }

  return (
    <section className="py-12 px-4 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Genera tu equipaje personalizado
        </h2>
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
              className="w-full p-3 rounded-lg text-white font-medium transition-colors duration-300"
              style={{ backgroundColor: "#8dd3ba" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#76bfa9")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#8dd3ba")
              }
            >
              Generar equipaje
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
