const pedidos =require("../../service/service.pedidos")
//Agredamos los Loggers 
const {loggerConsola,loggerWarn,loggerError} = require("../utils/loggers")
const {mailNuevoRegistro,mailCompraCliente,mailCompraAdmin} = require("..//utils/gmail")
require("dotenv").config()

const mostrarCarrito = async (req,res)=>{
    try{
        const user = req.user
        const pedido = await pedidos.getByUsername(user.username)
        if(pedido){
            res.render("./pages/carrito.ejs",{user,pedido})
        }else{
            res.send(`No tenes nada en tu carrito`)
        }
    }catch(error){
        loggerError.error(error)
    }
}

const eliminarCarrito = async (req,res)=>{
    try{
        const {idProducto} = req.params;
        const user = req.user;
        await pedidos.eliminarCarrito(user,idProducto)
        res.redirect("/carrito")
    }catch(error){
        loggerError.error(error)
    }
}

const carritoComprar = async(req,res)=>{
    try{
        const user = req.user
        const pedido = await pedidos.getByUsername(user.username)
        await mailCompraAdmin(user,pedido.pedidos)
        await mailCompraCliente(user,pedido.pedidos)
        const numeroVendedor = process.env.TEL_ADMIN
        await pedidos.eliminarTodoCarrito(user)
        res.render("./pages/compraRealizada.ejs",{numeroVendedor})
    }catch(error){
        loggerError.error(error)
    }
}

module.exports = {mostrarCarrito,eliminarCarrito,carritoComprar}