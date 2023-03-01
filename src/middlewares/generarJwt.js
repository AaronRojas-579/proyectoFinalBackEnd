const usuarios = require("../../service/service.usuarios.js")

const jwt = require("jsonwebtoken")
require("dotenv").config()

function generarToken(user){
    const token = jwt.sign({data:user},process.env.PALABRA_SECRETA,{expiresIn:'24h'})
    // console.log(token)
    return token
}

async function yaExiste (username){
   const userDB = await usuarios.getByUsername(username)
   if(userDB){
    return true
   }else{
    return false
   }
}

function userActual(token){
    const user = jwt.decode(token)
    return user.data
}


module.exports = {generarToken,yaExiste,userActual}