const {Schema,model} = require("mongoose");

const usuariosSchema = new Schema({
    username:{
        type:String,
        required:true,
        max:100,
    },
    password:{
        type:String,
        required:true,
        max:120,
    },
    email:{
        type:String,
        required:true,
        max:100,
    },
    url:{
        type:String,
        required:true,
    },
    // pedidos:{
    //     type:String,
    //     required:false
    // },
    admin:{
        type:Boolean,
        required:true,
    }
})

module.exports = model("Usuarios",usuariosSchema)