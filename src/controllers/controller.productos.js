//Agredamos los Loggers 
const {loggerConsola,loggerWarn,loggerError} = require("../utils/loggers")
const productos = require("../../service/service.productos")


const verListaProductos = async (req,res)=>{
    try{
        const user = req.user 
        const productoslista = await productos.getAll()
        res.render("./pages/indexCliente.ejs",{user,productoslista})
    }catch(error){
        loggerError.error(error)
    }
}

const adminProductos = (req,res)=>{
    try{
        const user = req.user;
        res.render("./pages/index.ejs",{user})
    }catch(error){
        loggerError.error(error)
    }
}

const renderFormUpdate = async (req,res)=>{
    try{
        const user = req.user
        const {id} = req.params
        const producto = (await productos.getById(id))[0]
        res.render("./pages/formUpdate.ejs",{producto,user})
    }catch(error){
        loggerError.error(error)
    }
}

const updateProducto = async (req,res)=>{
    try{
        const {id} = req.params;
        const productoEditado = {
            nombre: req.body.nombre,
            calidad: req.body.caldiad,
            precio: req.body.precio
        }
        await productos.updateById(id,productoEditado)
        loggerConsola.info(`Producto ${id} Editado con exito`)
        res.redirect("/productos/ejs")
    }catch(error){
        loggerError.error(error)
    }
}

module.exports = {verListaProductos,adminProductos,renderFormUpdate,updateProducto}