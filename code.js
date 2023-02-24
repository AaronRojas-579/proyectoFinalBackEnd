// let a = undefined
// console.log(a?true:false)



const pedidos = require("./service/service.pedidos.js")
// const dtoPedidos = require("./src/repo/userPedido.dto")

const nuevoProducto = {
    nombre:"Chivi",
    calidad:"Alta",
    precio:120000
}

const user={
    username:"Aarosadn",
    password:"234123",
    email:"aaa@hotmail.com"
}

let cantidad = 2

// pedidos.save(new dtoPedidos())

pedidos.agregarCarrito(user,nuevoProducto,cantidad)

// pedidos.getAll().then(res=>console.log(res))