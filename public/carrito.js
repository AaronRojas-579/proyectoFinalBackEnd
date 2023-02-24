const sumarCarrito = (id)=>{
    // alert(`funcion la funcion sumarCarrito`)
    let cantidad = parseInt(document.getElementById(id).innerText)
    cantidad++
    document.getElementById(id).innerText = cantidad
}

const restarCarrito = (id)=>{
    // alert(`funcion la funcion restar`)
    let cantidad = parseInt(document.getElementById(id).innerText)
    if(cantidad !== 0){
        cantidad--
        document.getElementById(id).innerText=cantidad
    }
}

const agregarCarrito = (id) =>{
    let cantidad = parseInt (document.getElementById(id).innerText);
    if(cantidad != 0){
        alert(`Se agrego al carrito`)
    }else{
        alert(`Ingrese una cantidad para agregar al Carrito`)
    }
}