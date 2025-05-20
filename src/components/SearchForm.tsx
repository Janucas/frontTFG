"use client"

import React from "react"

const SearchForm: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Descubre el clima de tu viaje
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          {/* Destino */}
          <div className="flex flex-col">
            <label htmlFor="destino" className="mb-2 text-gray-700 font-medium">
              Destino
            </label>
            <input
              id="destino"
              type="text"
              placeholder="Ej. París"
              className="w-full p-3 bg-white text-gray-800 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
          </div>

          {/* Fecha inicio */}
          <div className="flex flex-col">
            <label htmlFor="fecha-inicio" className="mb-2 text-gray-700 font-medium">
              Fecha de inicio
            </label>
            <input
              id="fecha-inicio"
              type="date"
              className="w-full p-3 bg-white text-gray-800 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
          </div>

          {/* Fecha de vuelta */}
          <div className="flex flex-col">
            <label htmlFor="fecha-fin" className="mb-2 text-gray-700 font-medium">
              Fecha de vuelta
            </label>
            <input
              id="fecha-fin"
              type="date"
              className="w-full p-3 bg-white text-gray-800 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
          </div>

          {/* Botón */}
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
      </div>
    </section>
  )
}

export default SearchForm
