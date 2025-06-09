# 🌐 Asistente de Equipaje Inteligente - Frontend  
## Proyecto de Desarrollo de Aplicaciones Web (DAW)  
**Alumno:** Juan Antonio Núñez Castaño

---

## 📑 Índice

- [Introducción](#✨-introducción)
- [Funcionalidades y Tecnologías](#⚙️-funcionalidades-y-tecnologías)
- [Guía de Instalación](#🛠️-guía-de-instalación)
- [Guía de Uso](#📚-guía-de-uso)
- [Interfaz Figma](#🎨-interfaz-figma)
- [Conclusión](#✅-conclusión)
- [Contribuciones, Agradecimientos y Referencias](#🙌-contribuciones-agradecimientos-y-referencias)
- [Licencia](#📜-licencia)
- [Contacto](#📬-contacto)

---

## ✨ Introducción

Este proyecto corresponde a la interfaz visual del **Asistente de Equipaje Inteligente**, desarrollado como parte del TFG del ciclo DAW. Permite a los usuarios interactuar de forma amigable con el sistema, autenticarse, buscar destinos, consultar su historial y recibir listas de equipaje detalladas.

### Justificación
Un frontend moderno y funcional es clave para ofrecer una experiencia intuitiva y atractiva. La aplicación se adapta a distintos dispositivos y está pensada para usarse tanto desde móvil como escritorio.

### Objetivos
- Desarrollar una SPA moderna con Next.js y TypeScript.
- Integrar la autenticación mediante Google con Firebase.
- Conectarse con la API REST del backend para mostrar resultados en tiempo real.

---

## ⚙️ Funcionalidades y Tecnologías

### Funcionalidades
- Registro e inicio de sesión con Google (Firebase Authentication).
- Formulario de búsqueda de destino y fechas.
- Visualización de resultados día por día con clima e ítems de equipaje.
- Visualización del historial de equipajes anteriores.
- Acceso condicional según si el usuario está logueado.

### Tecnologías utilizadas
- **Framework:** Next.js 14 + TypeScript  
- **Estilos:** Tailwind CSS  
- **Autenticación:** Firebase Authentication  
- **Conexión API:** Axios  
- **Gestión de estado:** Context API  
- **Animaciones y UI:** shadcn/ui + framer-motion  

---

## 🛠️ Guía de Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/Janucas/frontTFG.git
   cd frontTFG
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env.local` con las siguientes variables:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
   ```

4. Ejecuta el proyecto en modo desarrollo:
   ```bash
   npm run dev
   ```

---

## 📚 Guía de Uso

- Accede a la página principal.
- Inicia sesión con Google.
- Introduce un destino y un rango de fechas.
- Consulta los resultados diarios con clima e ítems recomendados.
- Accede a la sección de historial para ver búsquedas anteriores.

---

## 🎨 Interfaz Figma

Diseño visual del sistema:

```
https://www.figma.com/design/9R7G8ICkfYkpuF9rmb8cEM/Untitled?node-id=0-1&t=s6zTLgJMPZbiriny-1
```

---

## ✅ Conclusión

El frontend ha sido clave para facilitar la interacción con el sistema de generación de equipaje. La experiencia de desarrollo ha reforzado habilidades en React, gestión del estado, consumo de APIs y despliegue moderno de aplicaciones web.

---

## 🙌 Contribuciones, Agradecimientos y Referencias

### Contribuciones
- Juan Antonio Núñez Castaño- Desarrollador principal

### Agradecimientos
- Profesores del ciclo DAW.
- Usuarios testers por su feedback sobre usabilidad.

### Referencias
- https://nextjs.org/  
- https://firebase.google.com/  
- https://tailwindcss.com/  

---

## 📜 Licencia

Este proyecto está licenciado bajo los términos de la licencia MIT.

---

