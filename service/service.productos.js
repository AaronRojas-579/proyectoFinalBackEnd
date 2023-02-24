const daos = require("../daos/factory")
const modelProductos = require("../daos/models/productos.model")

const productos = new daos (modelProductos,"Productos")

module.exports=productos