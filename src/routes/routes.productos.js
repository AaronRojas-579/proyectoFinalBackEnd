const router = require("express").Router()
const {auth,authAdmin} = require("../middlewares/authJWT")

const {verListaProductos,adminProductos,renderFormUpdate,updateProducto} = require('../controllers/controller.productos')

router.get("/",auth,verListaProductos)
router.get("/ejs",authAdmin,adminProductos)
router.get("/formUpdate/:id",auth,renderFormUpdate)
router.post("/update/:id",auth,updateProducto)

module.exports = router