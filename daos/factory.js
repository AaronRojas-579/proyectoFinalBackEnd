require("dotenv").config()
const MongoDB = require("./dataBaseMongo")
const {loggerConsola,loggerWarn,loggerError} = require("../src/utils/loggers")

let optionDaos = process.env.DAOS || "";

let daos;

switch(optionDaos.toLowerCase()){
    case "mongo":
        daos=MongoDB;
        break;
    default:
        loggerError.error(`Error al encontrar el tipo de DAO a escoger`)
        break;
}

module.exports = daos