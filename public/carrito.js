
// var jwt = require('jsonwebtoken');
// import jwt from "jsonwebtoken"

// const { JsonWebTokenError } = require("jsonwebtoken");

const socket = io.connect();

// socket.on("pedidosCarrito",async (pedidosCarrito)=>{
//     const token = readCookie("token")
//     const user = decode(token)
//     console.log(user)
//     const pedido = pedidosCarrito.pedidos.find(e => e.username == user.username)
//     console.log(pedido)
//     const html = await makeListCarrito(pedido);
//     document.getElementById("listCarrito").innerHTML = html

// })

const sumarCarrito = (id)=>{
    // alert(`funcion la funcion sumarCarrito`)
    let cantidad = parseInt(document.getElementById(id).innerText)
    cantidad++
    document.getElementById(id).innerText = cantidad
}

const restarCarrito = (id)=>{
    // alert(`funcion la funcion restar`)
    let cantidad = parseInt(document.getElementById(id).innerText)
    if(cantidad !== 0){
        cantidad--
        document.getElementById(id).innerText=cantidad
    }
}

const agregarCarrito = async (id) =>{
    let cantidad = parseInt (document.getElementById(id).innerText);
    if(cantidad != 0){
        const token = readCookie("token")
        socket.emit("nuevoPedido",{id,cantidad,token})
        // alert(`Se agrego al carrito ${token}`)
        document.getElementById(id).innerText = 0
        return false
    }else{
        alert(`Ingrese una cantidad para agregar al Carrito`)
    }
}

// function eliminarProducto(id){
//     const token = readCookie("token");
//     socket.emit("pedidoEliminar",{id,token})
//     return location.href="./carrito"
// }

function readCookie(name) {
    var nameEQ = name + "="; 
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
  
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) {
        return decodeURIComponent( c.substring(nameEQ.length,c.length) );
      }
  
    }
    return null;
}

// function makeListCarrito (pedido){
//     fetch("/plantilla/listaCarrito.ejs")
//     .then(res=>res.text())
//     .then(plantilla=>{
//         const template = ejs.compile(plantilla)
//         const html = template({pedido})
//         return html
//     })
// }


