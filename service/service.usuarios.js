const daos = require("../daos/factory")
const modelUsuarios = require("../daos/models/usuarios.model")

const usuarios = new daos(modelUsuarios,"Usuarios")

module.exports=usuarios