'use client'

import React from 'react'
import Image from 'next/image'

const destinations = [
  { city: 'París', country: 'Francia', image: '/images/paris.jpg' },
  { city: 'Tokio', country: 'Japón', image: '/images/tokio.jpg' },
  { city: 'Nueva York', country: 'EE.UU.', image: '/images/nueva-york.jpg' },
]

const FeaturedDestinations: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
        Destinos mas visitados
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {destinations.map((dest, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl overflow-hidden shadow-xl transition-transform hover:scale-105 duration-300"
          >
            <div className="relative w-full h-48">
              <Image
                src={dest.image}
                alt={dest.city}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800">{dest.city}</h3>
              <p className="text-gray-600">{dest.country}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturedDestinations
