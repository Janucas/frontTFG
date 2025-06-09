
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Equipaje {
  id: number
  destino: string
  fechaSalida: string
  fechaRegreso: string
}

interface LugarTuristico {
  name: string
  category: string
  distance: number
}

const ITEMS_POR_PAGINA = 5

export default function HistorialPage() {
  const [equipajes, setEquipajes] = useState<Equipaje[]>([])
  const [paginaActual, setPaginaActual] = useState(1)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(true)
  const [lugares, setLugares] = useState<{ [id: number]: LugarTuristico[] }>({})
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/equipajes/historial`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          setError("❌ No se pudo obtener el historial de equipajes")
        } else {
          const data = await response.json()
          setEquipajes(data)
          for (const equipaje of data) {
            fetchLugaresTuristicos(equipaje.id, equipaje.destino)
          }
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

  const fetchLugaresTuristicos = async (equipajeId: number, ciudad: string) => {
    try {
      const tokenRes = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: process.env.NEXT_PUBLIC_AMADEUS_CLIENT_ID || "",
          client_secret: process.env.NEXT_PUBLIC_AMADEUS_CLIENT_SECRET || "",
        }),
      })

      const { access_token } = await tokenRes.json()

      const geoRes = await fetch(
        `https://test.api.amadeus.com/v1/reference-data/locations/cities?keyword=${encodeURIComponent(
          ciudad
        )}&max=1`,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )

      const geoData = await geoRes.json()
      const { latitude, longitude } = geoData.data[0]?.geoCode || {}

      if (!latitude || !longitude) return

      const poisRes = await fetch(
        `https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=${latitude}&longitude=${longitude}&radius=5`,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )

      const poisData = await poisRes.json()

      const lugaresFiltrados = poisData.data
        .filter((poi: any) => poi.name)
        .slice(0, 5)
        .map((poi: any) => ({
          name: poi.name,
          category: poi.category,
          distance: poi.distance.value,
        }))

      setLugares(prev => ({ ...prev, [equipajeId]: lugaresFiltrados }))
    } catch (error) {
      console.error("Error al obtener lugares turísticos", error)
    }
  }

  const totalPaginas = Math.ceil(equipajes.length / ITEMS_POR_PAGINA)
  const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA
  const equipajesPagina = equipajes.slice(inicio, inicio + ITEMS_POR_PAGINA)

  const siguientePagina = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1)
  }

  const anteriorPagina = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1)
  }

  const manejarEliminar = async (id: number) => {
    const token = localStorage.getItem("token")
    if (!token) return

    if (!confirm("¿Seguro que quieres borrar este equipaje?")) return

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/equipajes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.ok) {
        setEquipajes((prev) => prev.filter((e) => e.id !== id))
        setSuccess("✅ Equipaje eliminado correctamente")
        setError("")
      } else {
        setError("❌ No se pudo eliminar el equipaje")
        setSuccess("")
      }
    } catch (err) {
      console.error(err)
      setError("❌ Error al conectar con el servidor")
      setSuccess("")
    }
  }

  const manejarDescargaPDF = async (id: number) => {
    const token = localStorage.getItem("token")
    if (!token) return

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/equipajes/${id}/informe-pdf`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        setError("❌ No se pudo descargar el PDF")
        setSuccess("")
        return
      }

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `equipaje_${id}.pdf`
      a.click()
      window.URL.revokeObjectURL(url)

      setSuccess("✅ PDF descargado correctamente")
      setError("")
    } catch (err) {
      console.error(err)
      setError("❌ Error al descargar el PDF")
      setSuccess("")
    }
  }

  if (loading) return <p className="text-center mt-10 text-gray-600">Cargando historial...</p>
  if (error && equipajes.length === 0) return <p className="text-center mt-10 text-red-600">{error}</p>
  if (!loading && equipajes.length === 0) return <p className="text-center mt-10 text-gray-500">No tienes equipajes generados aún.</p>

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#8dd3ba] text-center mb-6">📦 Historial de equipajes</h1>

      {success && <p className="text-center text-green-600 font-medium mb-4">{success}</p>}
      {error && <p className="text-center text-red-600 font-medium mb-4">{error}</p>}

      <ul className="space-y-6 mb-10">
        {equipajesPagina.map((equipaje) => (
          <li key={equipaje.id} className="bg-white p-6 shadow-md rounded-lg border">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{equipaje.destino}</h2>
            <p className="text-gray-600 mb-2">
              📅 {new Date(equipaje.fechaSalida).toLocaleDateString()} – {new Date(equipaje.fechaRegreso).toLocaleDateString()}
            </p>

            <div className="mb-4">
              <h3 className="font-semibold">🏛️ Lugares turísticos recomendados:</h3>
              <ul className="list-disc list-inside text-sm mt-1">
                {lugares[equipaje.id]?.length > 0 ? (
                  lugares[equipaje.id].map((lugar, i) => (
                    <li key={i}>
                      {lugar.name} ({lugar.category}) – a {lugar.distance}m
                    </li>
                  ))
                ) : (
                  <li>Cargando recomendaciones...</li>
                )}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 mt-2">
              <button
                onClick={() => router.push(`/equipaje/${equipaje.id}`)}
                className="px-4 py-2 bg-[#8dd3ba] text-white rounded hover:bg-[#76bfa9] transition-colors"
              >
                Ver informe
              </button>
              <button
                onClick={() => manejarEliminar(equipaje.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Borrar
              </button>
              <button
                onClick={() => manejarDescargaPDF(equipaje.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Descargar PDF
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-center items-center gap-4 text-[#8dd3ba]">
        <button
          onClick={anteriorPagina}
          disabled={paginaActual === 1}
          className="px-4 py-2 rounded font-medium text-white transition-colors disabled:opacity-40"
          style={{
            backgroundColor: paginaActual === 1 ? "#8dd3ba80" : "#8dd3ba",
            cursor: paginaActual === 1 ? "default" : "pointer",
          }}
        >
          ← Anterior
        </button>
        <span className="font-medium text-gray-700">
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          onClick={siguientePagina}
          disabled={paginaActual === totalPaginas}
          className="px-4 py-2 rounded font-medium text-white transition-colors disabled:opacity-40"
          style={{
            backgroundColor: paginaActual === totalPaginas ? "#8dd3ba80" : "#8dd3ba",
            cursor: paginaActual === totalPaginas ? "default" : "pointer",
          }}
        >
          Siguiente →
        </button>
      </div>
    </div>
  )
}
