const app = require("./src/app")
//Loggers
const {loggerConsola,loggerWarn,loggerError} = require("./src/utils/loggers")
//Variables de Entorno
require("dotenv").config()

// const cluster = require("cluster")
const {cpus} = require("os")

const PORT = process.env.PORT || 8080;
// const modoCluster = process.argv[2] == "cluster"

// if(modoCluster && cluster.isPrimary){
//     loggerConsola.info(`Aqui va la configuración del modo Cluster`)
// }else{
//     app.listen(PORT,()=>{
//         loggerConsola.info(`Server listen on port ${PORT}`)
//     }).on('error',(error)=>{loggerWarn.warn(`Error en el servidor ${error}`)})
//     //Esta configuración del .on lo mantiene a la escucha de errores
// }

app.listen(PORT,(req,res)=>{
    loggerConsola.info(`Server listen on port ${PORT}`)
}).on('error',(error)=>{
    loggerWarn.warn(`Error en el servidor ${error}`)
})