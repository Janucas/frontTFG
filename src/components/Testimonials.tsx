import React from 'react'

const testimonials = [
  { name: 'Ivan', comment: 'Una experiencia increíble, todo fue perfecto.' },
  { name: 'Chicho', comment: 'Muy fácil de usar y los precios fueron competitivos.' },
  { name: 'Migue', comment: 'Repetiremos sin duda, nos encantó el viaje.' },
]

const Testimonials: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
        Lo que dicen nuestros usuarios
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((testi, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-8 text-center transition-transform hover:scale-105 duration-300"
          >
            <p className="text-gray-600 italic text-lg mb-6">"{testi.comment}"</p>
            <h3 className="text-xl font-bold" style={{ color: '#2a2d2c' }}>
              — {testi.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
