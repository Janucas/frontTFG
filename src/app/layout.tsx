import "@/app/globals.css"
import type { Metadata } from "next"
import TopHeader from "@/components/TopHeader"

export const metadata: Metadata = {
  title: "Asistente de Equipaje Inteligente",
  description: "Genera tu equipaje ideal según clima y fechas",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="font-sans bg-gray-50 text-gray-900">
        {/* Cabecera con mensaje y navegación */}
        <TopHeader />

        {/* Contenido principal */}
        <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  )
}
