const mongoose = require("mongoose")
mongoose.set("strictQuery",false)

//importamos Variables de entorno
require("dotenv").config()

//Aqui luego insertaremos los loggers 
const {loggerConsola,loggerWarn,loggerError} = require("../src/utils/loggers")

class MongoDB{
    constructor(model,nombreModel){
        this.nombreModel = nombreModel
        this.model=model,
        this.connect()
    }
    connect(){
        try{
            const URL = process.env.URL_MONGO;
            //Conexión con Mongo DB 
            mongoose.connect(URL,{
                useNewUrlParser:true,
                useUnifiedTopology:true
            })
            loggerConsola.info(`Base de datos ${this.nombreModel} Conectada`)
        }catch(error){
            loggerError.error(error)
        }
    }
    async save(obj){
        try{
            if(obj.length !== undefined){
                await this.model.insertMany(obj);
                loggerConsola.info(`Nuevos datos ingresados a la base de datos ${this.nombreModel}`)
            }else{
                await this.model.insertMany(obj);
                loggerConsola.info(`Nuevo dato ingresado a la base de datos ${this.nombreModel}`)
            }
        }catch(error){
            loggerError.error(error)
        }
    }
    async getAll(){
        try{
            const data = await this.model.find({});
            return data;
        }catch(error){
            loggerError.error(error)
        }
    }
    async getById(idABuscar){
        try{
            const data = await this.model.find({_id:idABuscar})
            if(data){
                return data;
            }else{
                loggerWarn.warn(`El id ${idABuscar} no corresponder a ningun dato de la base de datos ${this.nombreModel}`)
            }
        }catch(error){
            loggerError.error(error)
        }
    }
    async updateById(idAModificar,modificaciones){
        try{
            const data = (await this.model.find({_id:idAModificar}))[0]
            if(data){
                await this.model.updateOne({"_id":idAModificar},{$set:modificaciones})
                loggerConsola.info(`Dato modificado de la base de datos ${this.nombreModel}`)
            }else{
                loggerWarn.warn(`El id ${idAModificar} no corresponder a ningun dato de la base de datos ${this.nombreModel}`)
            }
        }catch(error){
            loggerError.error(error)
        }
    }
    async getByUsername (username){
        try{
            const data = (await this.model.find({username:username}))[0];
            if(data){
                return data;
            }else{
                loggerWarn.warn(`No se ha encontrado el Username que se intenta buscar en la base de datos ${this.nombreModel}`)
                return false
            }
        }catch(error){
            loggerError.error(error)
        }
    }
    async deleteById(idAEliminar){
        try{
            const data = await this.model.find({_id:idAEliminar});
            if(data){
                await this.model.deleteOne({_id:idAEliminar});
                loggerConsola.info(`Dato eliminado de la base de datos ${this.nombreModel}`)
            }else{ 
                loggerWarn.warn(`No se ha podido encontrar el dato con el id ${idAEliminar} en la base de datos ${this.nombreModel}`)
            }
        }catch(error){
            loggerError.error(error)
        }
    }
    async deleteAll(){
        try{
            await this.model.deleteMany({})
            loggerConsola.info(`Todos los datos de la base de datos ${this.nombreModel} fueron eliminados`)
        }catch(error){
            loggerError.error(error)
        }
    }
}

module.exports = MongoDB