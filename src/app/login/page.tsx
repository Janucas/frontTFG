"use client";

import React, { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import AuthButton from "@/components/AuthButton";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validarCampos = () => {
    const soloSimbolos = /^[^a-zA-Z0-9]*$/

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
      return "Correo electrónico inválido. Asegúrate de incluir un dominio válido como '.com', '.es', etc."

    if (password.length < 6 || soloSimbolos.test(password))
      return "La contraseña debe tener al menos 6 caracteres y contener letras o números."

    return ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setErrorMessage("Error: " + errorText);
        return;
      }

      const data = await response.json();
      const token = data.token;
      const username = data.username || email;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      window.dispatchEvent(new Event("storage"));

      setErrorMessage("");
      window.location.href = "/";

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorMessage("Hubo un error al iniciar sesión. Inténtalo de nuevo.");
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
            Iniciar sesión
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="text-red-600 font-medium text-sm text-center">
                {errorMessage}
              </div>
            )}

            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 text-gray-700 font-medium">
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

            <div className="flex flex-col">
              <label htmlFor="password" className="mb-2 text-gray-700 font-medium">
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

            <button
              type="submit"
              className="w-full p-3 mt-4 rounded-lg text-white font-medium transition-colors duration-300"
              style={{ backgroundColor: "#8dd3ba" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#1a1a1a")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#8dd3ba")
              }
            >
              Entrar
            </button>
          </form>

          {/* Separador y botón Google */}
          <div className="my-6 text-center text-sm text-gray-500">— o —</div>
          <AuthButton />

          <p className="mt-6 text-center text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <Link
              href="/register"
              className="text-[#8dd3ba] hover:text-[#1a1a1a] font-medium"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
