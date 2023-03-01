const {generarToken,yaExiste,userActual} = require("../middlewares/generarJwt")
const usuarios = require("../../service/service.usuarios")
const {isValidPassword,createHash,authPassword} =require("../middlewares/bcrypt")
const { loggerError } = require("../utils/loggers")
const {mailNuevoRegistro,mailCompraCliente,mailCompraAdmin} = require("../utils/gmail")

const registerJwt = async (req,res)=>{
    const {username,password,email,tel,url,admin} = req.body
    if(await yaExiste(username)){
        return res.json({error:`ya existe el usuario ${username}`})
    }else{
        const user = {username,password:createHash(password),email,tel,url,admin};
        await usuarios.save(user);
        // generarToken(user)
        await mailNuevoRegistro(user)
        res.redirect(`/`)
    }

}

const loginJwt = async (req,res)=>{
    const {username,password} = req.body;
    if(await yaExiste(username) && await authPassword(username,password)){
        // console.log(username)
        const user = await usuarios.getByUsername(username)
        // console.log(user)
        const access_token = generarToken(user)
        res.cookie("token",access_token)
        // console.log(req.cookies.token)
        res.redirect("/productos/ejs")
    }else{
        return res.json({error:`credenciales invalidas`})
    }
}

const logoutJwt = async(req,res)=>{
    try{
        const user = userActual(req.cookies.token)
        res.clearCookie("token")
        res.render("./pages/logout.ejs",{user})
    }catch(error){
        loggerError.error(error)
    }
}

module.exports = {registerJwt,loginJwt,logoutJwt}