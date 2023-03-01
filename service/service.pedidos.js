const daos = require("../daos/factory")
const modelCarrito = require("../daos/models/carrito.model")

const productos = require("./service.productos")

const dtoPedido = require("../src/repo/carrito.dto")


const {loggerConsola,loggerWarn,loggerError} = require("../src/utils/loggers")

class PedidosDB extends daos{
    constructor(model,nombreModel){
        super(model,nombreModel)
    }
    async agregarCarrito (user,idProducto,cantidad){
        try{ 
            const pedido = await this.getByUsername(user.username)
            const nuvoProducto = (await productos.getById(idProducto))[0]
            if(pedido){
                const index = pedido.pedidos.findIndex(e=>e.nombre == nuvoProducto.nombre)
                if(index >= 0){
                    //Existe un pedido
                    const nuevoPedido = new dtoPedido(nuvoProducto,cantidad)
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
    async eliminarCarrito (user,idProducto){
        try{
            const productoEliminar = (await productos.getById(idProducto))[0]
            const pedido = await this.getByUsername(user.username)
            const nuevoPedidos = pedido.pedidos.filter(e=>e.nombre != productoEliminar.nombre)
            await pedidos.updateById(pedido._id,{pedidos:nuevoPedidos})
            loggerConsola.info(`Es elimino el producto ${productoEliminar.nombre} del carrito de compra de ${user.username}`)
        }catch(error){
            loggerError.error(error)
        }
    } 
    async eliminarTodoCarrito (user){
        try{
            const pedido = await this.getByUsername(user.username)
            await pedidos.updateById(pedido._id,{pedidos:[]})
            loggerConsola.info(`Se elimino correctamente todos los pedidos del usuario:${user.username}`)
        }catch(error){
            loggerError.error(error)
        }
    } 
}


const pedidos = new PedidosDB(modelCarrito,"Pedidos")

module.exports = pedidos