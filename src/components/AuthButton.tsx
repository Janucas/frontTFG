// src/components/AuthButton.tsx
"use client";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "@/lib/firebase";
import { FcGoogle } from "react-icons/fc";

type AuthButtonProps = {
  mode?: "login" | "register";
};

export default function AuthButton({ mode = "login" }: AuthButtonProps) {
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

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login-google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.email,
          password: user.displayName,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Error en backend: " + errorText);
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", user.displayName || user.email);
      window.dispatchEvent(new Event("storage"));
      window.location.href = "/";
    } catch (error) {
      console.error("Error con login de Google:", error);
      alert("No se pudo iniciar sesión con Google.");
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-3 p-3 mt-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
    >
      <FcGoogle className="text-xl" />
      {mode === "register" ? "Registrarse con Google" : "Entrar con Google"}
    </button>
  );
}
