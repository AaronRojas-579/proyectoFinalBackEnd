const log4js = require("log4js")

log4js.configure({
    appenders:{
        miLoggerConsole:{type:'console'},
        miLoggerFile:{type:'file',filename:'warn.log'},
        miLoggerFile2:{type:'file',filename:'error.log'}
    },
    categories:{
        //Siempre tiene que estar configurada la categoria default
        default:{appenders:["miLoggerConsole"],level:'trace'},
        consola:{appenders:["miLoggerConsole"],level:'debug'},
        info:{appenders:["miLoggerConsole"],level:'info'},
        archivo:{appenders:["miLoggerFile"],level:'warn'},
        archivo2:{appenders:["miLoggerFile2"],level:'error'},
        todos:{appenders:["miLoggerFile","miLoggerFile2","miLoggerConsole"],level:"all"}
    }
})

const loggerConsola = log4js.getLogger("consola");
const loggerWarn = log4js.getLogger("archivo");
const loggerError = log4js.getLogger("archivo2");

module.exports = {
    loggerConsola,
    loggerWarn,
    loggerError
}