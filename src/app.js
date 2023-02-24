
const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
require("dotenv").config()

//Aqui importamos las rutas 
const routerInfo = require("./routes/routes.info")
const routerProductos = require("./routes/routes.productos")
const routerJWT = require("./routes/routes.jwt")
const routerCarrito = require("./routes/routes.carrito")

//Configuraciones 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.static('public'))

//Loggers
const {loggerConsola,loggerWarn,loggerError} = require("./utils/loggers")

//Configuración de los views con ejs
app.set("view engine","ejs")//Aqui indicamos el motor de plantilla que usaremos
app.set("views","views")//Indicamos en donde se ubica la carpeta views

//Aplicamos las rutas a nuestra aplicación
app.use("/info",routerInfo)
app.use("/productos",routerProductos)
app.use('/jwt',routerJWT)
app.use("/carrito",routerCarrito)


//Configuración para el Socket.io

//Importamos la clase de mensajes para el chat Global 
const mensajes = require("../service/service.mensajes.js")
const productos = require("../service/service.productos.js")

const {Server : HttpServer} = require("http")
const {Server : IOServer} = require("socket.io")
const httpServer = new HttpServer (app)
//Configuración del socket.io
const io =new IOServer(httpServer)

io.on('connection',async (socket) =>{
     loggerConsola.info(`Nuevo Cliente conectado`)

     //Configuración del socket.io para el Chat Global----------
     var mensajesListar = await mensajes.getAll();
     socket.emit("mensajes",mensajesListar) //Esto lo que envia al front 

     socket.on("nuevoMensaje", async (nuevoMensaje)=>{
        await mensajes.save(nuevoMensaje);
        mensajesListar = await mensajes.getAll()
        io.sockets.emit("mensajes",mensajesListar)
     })

     //Configuración del socket.io para la lista de Productos 
     var productosListar = await productos.getAll()
     socket.emit("productos",productosListar);
     socket.on("nuevoProducto",async (nuevoProducto)=>{
         await productos.save(nuevoProducto)
         productosListar = await productos.getAll()
         io.sockets.emit("productos",productosListar)
     })
     socket.on("eliminarProducto",async id=>{
         await productos.deleteById(id)
         productosListar = await productos.getAll()
         io.sockets.emit("productos",productosListar)
     })

}) 

module.exports = httpServer;