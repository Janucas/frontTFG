// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDz0GcaE0newH4fK2Wb0wubaGhR3Q_U02I",
  authDomain: "travelguru-948cf.firebaseapp.com",
  projectId: "travelguru-948cf",
  storageBucket: "travelguru-948cf.appspot.com", // corregido
  messagingSenderId: "1030374014329",
  appId: "1:1030374014329:web:ceeff24427c8d2dcce43a8",
  measurementId: "G-EV8W2BK7PK"
};

// Inicializa la app y los servicios de auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Exporta todo lo necesario
export { app, auth, provider };
