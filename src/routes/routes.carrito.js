const router = require("express").Router()
const {auth,authAdmin} = require("../middlewares/authJWT")
const {mostrarCarrito,eliminarCarrito,carritoComprar} = require('../controllers/controller.carrito')

router.get("/",auth,mostrarCarrito)
router.get("/eliminarCarrito/:idProducto",auth,eliminarCarrito)
router.get("/comprar",auth,carritoComprar)

module.exports = router