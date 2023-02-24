const router = require("express").Router()

router.get("/",(req,res)=>{
    res.json({
        "Argumentos de entrada":process.argv.slice(2),
        "Path de ejecución":process.argv[0],
        "Carpeta del Proyecto":process.argv[1],
        "Directorio actual de Trabajo":process.cwd(),
        "Id del proceso":process.pid,
        "Version de Node":process.version,
        "Título del proceso":process.title,
        "Sistema Operativo":process.platform,
        "Memoria Total Reservada":process.memoryUsage().rss
    })
})

module.exports = router