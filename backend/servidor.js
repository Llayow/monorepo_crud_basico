// Responsabilidad: Encender el servidor y conectar las piezas (CORS, JSON, Imagenes y rutas).
import express from "express"
import cors from "cors"
import rutasArticulos from "./rutasArticulos"
import {CARPETA_IMAGENES} from "./subirImagen"

const aplicacion = express()
const PUERTO = 3000

aplicacion.use(cors()) // Permite que REACT (puerto 5173)
aplicacion.use(express.json()) // Entiendo peticiones con formato o cuerpo .JSON
aplicacion.use("/uploads", express.static(CARPETA_IMAGENES)) // En el entorno local muestra la imagen
aplicacion.use("/api/articulos", rutasArticulos) // Todas las rutas del CRUD

// Errores de multer (archivo demasiado grande, etc.)
aplicacion.use((error, peticion, respuesta, siguiente)=>{
    const mensaje = error.code === "LIMITI_FILE_SIZE"
    ? "Archivo demasiado grande (Maximo 2MB)"
    : error.message
    respuesta.status(400).json({error: mensaje})
})

aplicacion.listen(PUERTO, ()=> console.log(`Servidor escuchando en http://localhost:${PUERTO}`))
