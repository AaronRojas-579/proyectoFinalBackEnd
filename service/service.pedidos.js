const daos = require("../daos/factory")
const modelCarrito = require("../daos/models/carrito.model")

const dtoPedido = require("../src/repo/carrito.dto")

const {loggerConsola,loggerWarn,loggerError} = require("../src/utils/loggers")

class PedidosDB extends daos{
    constructor(model,nombreModel){
        super(model,nombreModel)
    }
    async agregarCarrito (user,nuvoProducto,cantidad){
        try{ 
            const pedido = await this.getByUsername(user.username)
            // console.log(pedido)
            if(pedido){
                const index = pedido.pedidos.findIndex(e=>e.nombre == nuvoProducto.nombre)
                console.log(index)
                if(index >= 0){
                    //Existe un pedido
                    const nuevoPedido = new dtoPedido(nuvoProducto,cantidad)
                    // pedido.pedidos[index] = {...nuevoPedido}
                    // console.log(pedido)
                    await pedidos.updateById(pedido._id,{pedidos:nuevoPedido})
                    loggerConsola.info(`Se actualizo la cantidad de ${nuvoProducto.nombre} al carrito de ${user.username}`)
                }else{
                    const nuevoPedido = new dtoPedido(nuvoProducto,cantidad);
                    pedido.pedidos.push(nuevoPedido);
                    await pedidos.updateById(pedido._id,{pedidos:pedido.pedidos})
                    loggerConsola.info(`Se agrego ${nuvoProducto.nombre} al carrito de ${user.username}`)
                }
            }else{
                //No existe ningun pedido
                const nuevoPedido = {
                    username:user.username,
                    pedidos:[new dtoPedido(nuvoProducto,cantidad)]
                }
                await this.save(nuevoPedido)

                loggerConsola.info(`Creamos un nuevo carrito para el usuario ${user.username} - se agrego ${nuevoPedido.nombre} al carrito`)
            }
        }catch(error){
            loggerError.error(error)
        }
    }
}


const pedidos = new PedidosDB(modelCarrito,"Pedidos")

module.exports = pedidos