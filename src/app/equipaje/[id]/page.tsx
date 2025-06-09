"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

interface InformeDia {
  texto: string
}

export default function InformeEquipajePage() {
  const { id } = useParams()
  const [informe, setInforme] = useState<InformeDia[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      setError("❌ Debes iniciar sesión para ver este equipaje")
      setLoading(false)
      return
    }

    const fetchInforme = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/equipajes/${id}/informe`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          setError("❌ No se pudo cargar el informe del equipaje")
        } else {
          const data = await response.json()
          setInforme(data)
        }
      } catch (err) {
        console.error(err)
        setError("❌ Error de conexión con el servidor")
      } finally {
        setLoading(false)
      }
    }

    fetchInforme()
  }, [id])

  if (loading) return <p className="text-center mt-10 text-gray-600">Cargando informe...</p>
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#8dd3ba] text-center mb-6">📝 Informe de equipaje</h1>

      <div className="space-y-6">
        {informe.map((dia, index) => (
          <div key={index} className="bg-white shadow p-4 rounded border">
            <pre className="whitespace-pre-wrap font-sans text-gray-800">{dia.texto}</pre>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => router.push("/historial")}
          className="mt-4 px-4 py-2 bg-[#8dd3ba] text-white rounded hover:bg-[#76bfa9] transition-colors"
        >
          ← Volver al historial
        </button>
      </div>
    </div>
  )
}
