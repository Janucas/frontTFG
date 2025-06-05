"use client";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { useState } from "react";

export default function AuthButton() {
  const [user, setUser] = useState<any>(null);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);

      // Aquí llamas a tu backend para registrar o autenticar
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login-google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          nombre: user.displayName,
          uid: user.uid, // puedes usar esto como identificador único
        }),
      });

      const data = await response.json();

      // Guardar token recibido
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", String(user.displayName));
        window.dispatchEvent(new Event("storage"));
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  return (
    <button
      onClick={loginWithGoogle}
      className="w-full p-3 mt-4 rounded-lg text-white font-medium transition-colors duration-300"
      style={{ backgroundColor: "#db4437" }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#a93429")}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#db4437")}
    >
      Iniciar sesión con Google
    </button>
  );
}
