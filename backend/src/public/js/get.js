const urlBase = "http://localhost:3000";
const contenedorProductos = document.querySelector(".contenedor-productos");
const getProductForm = document.getElementById("getProductForm");

function mostrarError(mensaje) {
    contenedorProductos.innerHTML = `
                <p class="mensaje error">${mensaje}</p>
            `;
}

getProductForm.addEventListener("submit", async (event) =>{
    event.preventDefault();

    const idProd = event.target.idProd.value.trim();
    console.log(idProd);

    if (!idProd) {
        return mostrarError("Ingresa un id valido");
    }
    try {
        const response = await fetch(`${urlBase}/api/products/${idProd}`);
        console.log(response);
        const data = await response.json();

        if (!response.ok) {
            console.error(data.message);
            return mostrarError(data.message);
        }
        const producto = data.payload[0];
        renderizarProducto(producto); 
    } catch (error) {       
        console.error("Error al obtener productos: ", error);
        return mostrarError("Error de conexion con el servidor");
    }
});

function renderizarProducto(producto) {
    let htmlProducto = `
        <div class="card-producto">
            <img class="card-img" src="${producto.image}" alt="${producto.name}">
            <h4>${producto.name}</h4>
            <p class="card-autor">${producto.author}</p>
            <p class="card-id">Id: ${producto.id}</p>
            <p class="card-precio">$ ${Number(producto.price).toLocaleString("es-AR")}</p>
            <span class="badge ${producto.active ? "activo" : "inactivo"}">
                ${producto.active ? "Activo" : "Inactivo"}
            </span>
        </div>
    `;
    contenedorProductos.innerHTML = htmlProducto;
}