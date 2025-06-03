// "use client"

// import Link from "next/link"
// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"

// export default function Navbar() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const router = useRouter()

//   useEffect(() => {
//     const token = localStorage.getItem("token")
//     setIsAuthenticated(!!token)
//   }, [])

//   const handleLogout = () => {
//     localStorage.removeItem("token")
//     setIsAuthenticated(false)
//     router.push("/login")
//   }

//   return (
//     <nav className="w-full bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
//         <Link href="/" className="text-2xl font-bold" style={{ color: '#8dd3ba' }}>
//           Equipaje Inteligente
//         </Link>
//         <div className="space-x-4 flex items-center">
//           <Link href="/" className="text-gray-800 hover:text-[#76bfa9] transition-colors duration-200">
//             Inicio
//           </Link>
//           <Link href="/equipaje" className="text-gray-800 hover:text-[#76bfa9] transition-colors duration-200">
//             Generar Equipaje
//           </Link>
//           {isAuthenticated && (
//             <>
//               <Link href="/historial" className="text-gray-800 hover:text-[#76bfa9] transition-colors duration-200">
//                 Historial
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="text-red-600 font-semibold hover:text-red-800 transition-colors duration-200"
//               >
//                 Logout
//               </button>
//             </>
//           )}
//           {!isAuthenticated && (
//             <>
//               <Link href="/login" className="text-gray-800 hover:text-[#76bfa9] transition-colors duration-200">
//                 Login
//               </Link>
//               <Link href="/register" className="text-gray-800 hover:text-[#76bfa9] transition-colors duration-200">
//                 Register
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   )
// }
