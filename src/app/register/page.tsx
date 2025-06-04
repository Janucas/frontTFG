"use client";

import React, { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function RegisterPage() {
  const [username, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          password,
          nombre: username,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setErrorMessage("Error al registrar: " + errorText);
        return;
      }

      setSuccessMessage("✅ ¡Registro exitoso!");
      setErrorMessage("");
    } catch (error) {
      console.error("Error en el registro:", error);
      setErrorMessage("Hubo un error en el registro.");
    }
  };

  return (
    <>
      <section
        className="py-20 px-4 min-h-screen flex justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/peru.jpg')" }}
      >
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-[#8dd3ba] mb-6">
            Crear cuenta
          </h2>

          {errorMessage && (
            <div className="mb-4 text-center text-red-600 font-medium">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 text-center text-green-600 font-medium">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div className="flex flex-col">
              <label htmlFor="nombre" className="mb-2 text-[#8dd3ba] font-medium">
                Nombre completo
              </label>
              <input
                id="nombre"
                type="text"
                value={username}
                placeholder="Nombre de usuario"
                onChange={(e) => setNombre(e.target.value)}
                className="p-3 bg-white text-gray-700 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* DNI */}
            <div className="flex flex-col">
              <label htmlFor="dni" className="mb-2 text-[#8dd3ba] font-medium">
                DNI
              </label>
              <input
                id="dni"
                type="text"
                value={dni}
                placeholder="12345678A"
                onChange={(e) => setDni(e.target.value)}
                className="p-3 bg-white text-gray-700 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* Fecha nacimiento */}
            <div className="flex flex-col">
              <label htmlFor="fechaNacimiento" className="mb-2 text-[#8dd3ba] font-medium">
                Fecha de nacimiento
              </label>
              <input
                id="fechaNacimiento"
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                className="p-3 bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* Teléfono */}
            <div className="flex flex-col">
              <label htmlFor="telefono" className="mb-2 text-[#8dd3ba] font-medium">
                Teléfono
              </label>
              <input
                id="telefono"
                type="tel"
                value={telefono}
                placeholder="+34 600 000 000"
                onChange={(e) => setTelefono(e.target.value)}
                className="p-3 bg-white text-gray-700 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 text-[#8dd3ba] font-medium">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                placeholder="ejemplo@email.com"
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 bg-white text-gray-700 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* Contraseña */}
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-2 text-[#8dd3ba] font-medium">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 bg-white text-gray-700 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* Botón de enviar */}
            <button
              type="submit"
              className="w-full p-3 mt-4 rounded-lg text-white font-medium transition-colors duration-300"
              style={{ backgroundColor: "#8dd3ba" }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1a1a1a")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#8dd3ba")}
            >
              Registrarse
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-[#8dd3ba] hover:text-[#1a1a1a] font-medium">
              Inicia sesión
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
