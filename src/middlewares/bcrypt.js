const bCrypt = require("bcrypt")
const usuarios=require("../../service/service.usuarios")

function isValidPassword (user,password){
    return bCrypt.compareSync(password,user.password)
}

function createHash(password){
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null
        )
}

async function authPassword (username,password){
    const user = await usuarios.getByUsername(username);
    if(user){
        return isValidPassword(user,password)
    }else{
        return false
    }

}

module.exports = {isValidPassword,createHash,authPassword}