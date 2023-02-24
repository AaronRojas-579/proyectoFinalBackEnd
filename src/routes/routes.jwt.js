const router = require("express").Router()
const {generarToken,yaExiste,userActual} = require("../middlewares/generarJwt")
const usuarios = require("../../service/service.usuarios")
const {isValidPassword,createHash,authPassword} =require("../middlewares/bcrypt")
const { loggerError } = require("../utils/loggers")


router.post("/register", async (req,res)=>{
    const {username,password,email,tel,url,admin} = req.body
    if(await yaExiste(username)){
        return res.json({error:`ya existe el usuario ${username}`})
    }
    const user = {username,password:createHash(password),email,tel,url,admin};
    await usuarios.save(user);
    res.redirect(`/`)

})

router.post("/login",async (req,res)=>{
    const {username,password} = req.body;
    if(await yaExiste(username) && await authPassword(username,password)){
        const user = await usuarios.getByUsername(username)
        const access_token = generarToken(user)
        res.cookie("token",access_token).redirect("/productos/ejs")
    }else{
        return res.json({error:`credenciales invalidas`})
    }
})

router.get("/logout",async(req,res)=>{
    try{
        const user = userActual(req.cookies.token)
        res.clearCookie("token")
        res.render("./pages/logout.ejs",{user})
    }catch(error){
        loggerError.error(error)
    }
})

module.exports = router