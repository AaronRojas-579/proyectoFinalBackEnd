const router = require("express").Router()

//Agredamos los Loggers 
const {loggerConsola,loggerWarn,loggerError} = require("../utils/loggers")

router.get("/",(req,res)=>{
    try{
        res.render("./pages/carrito.ejs")
    }catch(error){
        loggerError.error(error)
    }
})

module.exports = router