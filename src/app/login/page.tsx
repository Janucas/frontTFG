"use client";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "@/lib/firebase"; // Asegúrate de que tienes esta configuración
import { FcGoogle } from "react-icons/fc";

export default function AuthButton() {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (!user.email || !user.displayName) {
        alert("Faltan datos de usuario.");
        return;
      }

      // Llamada al backend con email y nombre como "password"
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login-google`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: user.email,
            password: user.displayName,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Error en backend: " + errorText);
      }

      const data = await response.json();
      const token = data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("username", user.email);

      // Notificar a otros componentes y redirigir
      window.dispatchEvent(new Event("storage"));
      window.location.href = "/";
    } catch (error) {
      console.error("Error con login de Google:", error);
      alert("Error al iniciar sesión con Google.");
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-3 p-3 mt-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
    >
      <FcGoogle className="text-xl" />
      Iniciar sesión con Google
    </button>
  );
}
