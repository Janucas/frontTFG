import Hero from "@/components/Hero"
import FeaturedDestinations from "@/components/FeatureDestinations"
import SearchForm from "@/components/SearchForm"
import Testimonials from "@/components/Testimonials"
import Footer from "@/components/Footer"

export default function HomePage() {
  return (
    <div>
      {/* Hero con imagen de fondo y botón central */}
      <Hero />

      {/* Buscador o formulario de fechas (si lo mantienes también aquí) */}
      <SearchForm />

      {/* Destinos destacados */}
      <FeaturedDestinations />

      {/* Testimonios */}
      <Testimonials />

      {/* Testimonios */}
      <Footer />
    </div>
  )
}
