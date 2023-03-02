const socket = io.connect();

//Creamos la función para crear nuevos mensajes
function addMensaje(e){
    let date = new Date().toLocaleString()
    const mensaje = {
        author:{
            nombre:document.getElementById("nombreMensaje").value,
            date:date
        },
        text: document.getElementById("text").value
    }
    socket.emit("nuevoMensaje",mensaje);
    document.getElementById("mensaje").reset()
    return false
}

function addProducto (e){
    const nuevoProducto ={
        nombre:document.getElementById("nombre").value,
        calidad:document.getElementById("calidad").value,
        precio:document.getElementById("precio").value
    }
    socket.emit("nuevoProducto",nuevoProducto);
    document.getElementById("formNuevoProducto").reset()
    return false
}

//Code para el Chat Global---------------------
socket.on("mensajes",async (mensajes)=>{
    const html = await makeHtmlList (mensajes);
    document.getElementById("mostarMensaje").innerHTML = html ;
})

//Función para listar los mensaje 
function makeHtmlList (mensajes){
    const html = mensajes.map(elem=>{
        return(`
        <div>
        <strong class="chatTitle">${elem.author.nombre}</strong> <span style="color:white">${elem.author.date}</span> : <i>${elem.text}</i>
        </div>
        `)
    }).join(`</br>`)
    return html
}



//Code para listar Productos -------------------
socket.on("productos",async (productos)=>{
    const html = await makeHtmlListProductos(productos)
    document.getElementById("listaProductosAdmin").innerHTML = html;
})

function makeHtmlListProductos(productos){
    return fetch("/plantillas/listaProductosAdmin.ejs")
    .then(res=> res.text())
    .then(planilla=>{
        const template = ejs.compile(planilla)
        const html = template({productos})
        return html
    })
}

function updateProducto(id){
    location.href=`/productos/formUpdate/${id}`
}

function deleteProducto(id){
    // console.log(`Hola soy el boton delete ${id}`)
    socket.emit("eliminarProducto",id)
}



