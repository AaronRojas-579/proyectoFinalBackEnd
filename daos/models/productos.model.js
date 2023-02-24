const {Schema,model} = require("mongoose")

const productosSchema = new Schema({
    nombre:{
        type:String,
        required:true,
        max:100,
        unique:true,
    },
    calidad:{
        type:String,
        required:true,
    },
    precio:{
        type:Number,
        required:true,
    }
})

module.exports = model("Productos",productosSchema)