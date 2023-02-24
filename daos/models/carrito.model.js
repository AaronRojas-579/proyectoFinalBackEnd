const {Schema,model} = require("mongoose")

const carritoModel = new Schema({
    username:{
        type:String,
        required:true
    },
    pedidos:{
        type:Array,
        required:true,
        default:[]
    }
})

module.exports=model("Pedidos",carritoModel)