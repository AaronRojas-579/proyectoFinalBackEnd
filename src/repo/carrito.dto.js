class carritoDto {
    constructor(carrito,cantidad){
        this.idProducto = carrito._id
        this.nombre = carrito.nombre,
        this.precio = carrito.precio,
        this.cantidad = cantidad,
        this.total = (cantidad * this.precio)
    }
}

module.exports = carritoDto