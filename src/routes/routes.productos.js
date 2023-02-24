const router = require("express").Router()
const productos = require("../../service/service.productos")
const {auth,authAdmin} = require("../middlewares/authJWT")

//Agredamos los Loggers 
const {loggerConsola,loggerWarn,loggerError} = require("../utils/loggers")

router.get("/",auth,async (req,res)=>{
    try{
        const user = req.user 
        const productoslista = await productos.getAll()
        res.render("./pages/indexCliente.ejs",{user,productoslista})
    }catch(error){
        loggerError.error(error)
    }
})


router.get("/ejs",authAdmin,(req,res)=>{
    try{
        res.render("./pages/index.ejs")
    }catch(error){
        loggerError.error(error)
    }
})

router.get("/formUpdate/:id",auth,async (req,res)=>{
    try{
        const {id} = req.params
        const producto = (await productos.getById(id))[0]
        res.render("./pages/formUpdate.ejs",{producto})
    }catch(error){
        loggerError.error(error)
    }
})

router.post("/update/:id",auth,async (req,res)=>{
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
})

module.exports = router