const router = require("express").Router()
const pedidos =require("../../service/service.pedidos")
//Agredamos los Loggers 
const {loggerConsola,loggerWarn,loggerError} = require("../utils/loggers")
const {auth,authAdmin} = require("../middlewares/authJWT")
const {mailNuevoRegistro,mailCompraCliente,mailCompraAdmin} = require("..//utils/gmail")
require("dotenv").config

router.get("/",auth,async (req,res)=>{
    try{
        const user = req.user
        // console.log(user)
        const pedido = await pedidos.getByUsername(user.username)
        // console.log(pedido)
        if(pedido){
            res.render("./pages/carrito.ejs",{user,pedido})
        }else{
            res.send(`No tenes nada en tu carrito`)
        }
    }catch(error){
        loggerError.error(error)
    }
})
router.get("/eliminarCarrito/:idProducto",auth,async (req,res)=>{
    try{
        const {idProducto} = req.params;
        console.log(idProducto)
        const user = req.user;
        await pedidos.eliminarCarrito(user,idProducto)
        res.redirect("/carrito")
    }catch(error){
        loggerError.error(error)
    }
})

router.get("/comprar",auth,async(req,res)=>{
    try{
        const user = req.user
        const pedido = await pedidos.getByUsername(user.username)
        // console.log(pedido)
        // await mailCompraCliente(user,pedido.pedidos)
        // console.log(pedido.pedidos)
        await mailCompraAdmin(user,pedido.pedidos)
        await mailCompraCliente(user,pedido.pedidos)
        const numeroVendedor = process.env.TEL_ADMIN
        await pedidos.eliminarTodoCarrito(user)
        res.render("./pages/compraRealizada.ejs",{numeroVendedor})
    }catch(error){
        loggerError.error(error)
    }
})

module.exports = router