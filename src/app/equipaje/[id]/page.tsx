"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

interface DiaEquipaje {
  fecha: string
  clima?: {
    descripcion: string
    temperaturaMin: number
    temperaturaMax: number
  }
  items: {
    nombre: string
  }[]
}

export default function InformeEquipajePage() {
  const { id } = useParams()
  const [informe, setInforme] = useState<DiaEquipaje[]>([])
  const [error, setError] = useState("")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const token = localStorage.getItem("token")
    if (!token) {
      setError("❌ Debes iniciar sesión para ver el informe")
      return
    }

    const fetchInforme = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/equipajes/${id}/informe`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (!response.ok) {
          setError("❌ Error al obtener el informe del equipaje")
          return
        }

        const data = await response.json()
        setInforme(data)
      } catch (err) {
        console.error(err)
        setError("❌ Error de conexión con el servidor")
      }
    }

    fetchInforme()
  }, [id])

  if (!isClient) return null
  if (error) return <p className="text-center text-red-600 font-medium mt-10">{error}</p>
  if (!informe.length) return <p className="text-center text-gray-500 mt-10">Cargando informe...</p>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#8dd3ba] mb-6 text-center">
        Informe de equipaje #{id}
      </h1>

      {informe.map((dia, index) => (
        <div key={index} className="mb-8 border-b pb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            📅 {new Date(dia.fecha).toLocaleDateString()}
          </h2>
          {dia.clima ? (
            <p className="text-gray-600 mb-2">
              🌤️ {dia.clima.descripcion} | 🌡️ {dia.clima.temperaturaMin}°C - {dia.clima.temperaturaMax}°C
            </p>
          ) : (
            <p className="text-gray-600 mb-2 italic">🌤️ Clima no disponible</p>
          )}
          <ul className="list-disc list-inside text-gray-800">
            {dia.items.map((item, i) => (
              <li key={i}>🧳 {item.nombre}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
