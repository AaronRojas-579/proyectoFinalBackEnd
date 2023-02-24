const daos = require("../daos/factory")
const modelMensajes = require("../daos/models/mensajes.model")

const mensajes = new daos(modelMensajes,"Mensajes")

module.exports = mensajes