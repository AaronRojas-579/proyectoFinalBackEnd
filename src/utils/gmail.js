const {createTransport} = require("nodemailer")
require("dotenv")

const {loggerConsola,loggerWarn,loggerError} = require("./loggers")

const transporter = createTransport({
    service:"gmail",
    port:587,
    auth:{
        user:process.env.MAIL_ADMIN,
        pass:process.env.PASS_ADMIN
    }
})

const mailNuevoRegistro = async (objUser)=>{
    try{
        const info = await transporter.sendMail({
            from:"Administrador de la Página",
            to:process.env.MAIL_ADMIN,
            subject:"Nuevo Registro",
            html:`
            <h3>Username</h3>
            <h4 style="color:red">${objUser.username}</h4>
            <br>
            <h3>Foto de Perfil</h3>
            <img src="${objUser.url}" alt="foto de perfil">
            <br>
            <h3>Correo Electronico</h3>
            <h4 style="color:red">${objUser.email}</h4>
            <br>
            <h3>Número de Telefono</h3>
            <h4 style="color:red">${objUser.tel}</h4>
            `
        })
        loggerConsola.info(info)
    }catch(error){
        loggerError.error(error)
    }
}

const mailCompraCliente =async(user,arrPedidos)=>{
    try{
        const html = arrPedidos.map(e=>{
            return(` + ${e.cantidad} unidad/es de ${e.nombre} = $${e.total} `)
        }).join(`<br>`)
        const info = await transporter.sendMail({
            from:"Administrador de la Página",
            to:user.email,
            subject:"El Vendedor ya recibió tu pedido",
            html:`
            <h2>Tu pedido:</h2>
            ${html}
            <h3>Para mas información sobre el estado de tu pedido puede comunicarte con el vendedor:</h3>
            tel:${process.env.TEL_ADMIN}
            `
        })
        loggerConsola.info(info)
    }catch(error){
        loggerError.error(error)
    }
}

const mailCompraAdmin = async(objUser,arrPedidos)=>{
    try{    
        const html = arrPedidos.map(e=>{
            return(` + ${e.cantidad} unidad/es de ${e.nombre} = $${e.total} `)
        }).join(`<br>`)

        const info = await transporter.sendMail({
            from:"Administrador de la Página",
            to:process.env.MAIL_ADMIN,
            subject:"Nueva Compra",
            html:`
                <h4 style="color:red"> Username: ${objUser.username}</h4>
                <h4>Correo Electronico ${objUser.email}</h4>
                <br>
                <h4>Su Pedido es :</h4>
                ${html}
            `,
        })
        // loggerConsola.info(info)
    }catch(error){
        loggerError.error(error)
    }
}

module.exports={mailNuevoRegistro,mailCompraCliente,mailCompraAdmin}