"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Equipaje {
  id: number
  destino: string
  fechaSalida: string
  fechaRegreso: string
}

export default function HistorialPage() {
  const [equipajes, setEquipajes] = useState<Equipaje[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      setError("❌ Debes iniciar sesión para ver tu historial")
      setLoading(false)
      return
    }

    const fetchHistorial = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/mis-equipajes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          setError("❌ No se pudo obtener el historial de equipajes")
        } else {
          const data = await response.json()
          setEquipajes(data)
        }
      } catch (err) {
        console.error(err)
        setError("❌ Error de conexión con el servidor")
      } finally {
        setLoading(false)
      }
    }

    fetchHistorial()
  }, [])

  if (loading) return <p className="text-center mt-10 text-gray-600">Cargando historial...</p>
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>
  if (equipajes.length === 0) return <p className="text-center mt-10 text-gray-500">No tienes equipajes generados aún.</p>

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#8dd3ba] text-center mb-8">📦 Historial de equipajes</h1>

      <ul className="space-y-6">
        {equipajes.map((equipaje) => (
          <li key={equipaje.id} className="bg-white p-6 shadow-md rounded-lg border">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{equipaje.destino}</h2>
            <p className="text-gray-600 mb-2">
              📅 {new Date(equipaje.fechaSalida).toLocaleDateString()} – {new Date(equipaje.fechaRegreso).toLocaleDateString()}
            </p>
            <button
              onClick={() => router.push(`/equipaje/${equipaje.id}`)}
              className="mt-2 px-4 py-2 bg-[#8dd3ba] text-white rounded hover:bg-[#76bfa9] transition-colors"
            >
              Ver informe
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
