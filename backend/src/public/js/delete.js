const urlBase = "http://localhost:3000";
const contenedorProductos = document.querySelector(".contenedor-productos");
const getProductForm = document.getElementById("getProductForm");

function mostrarMensaje(tipo, mensaje) {
    contenedorProductos.innerHTML = `
        <p class="mensaje ${tipo}">${mensaje}</p>
    `;
}

getProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const idProd = event.target.idProd.value.trim();

    if (!idProd) {
        return mostrarMensaje("error", "Ingresa un id valido");
    }

    try {
        const response = await fetch(`${urlBase}/api/products/${idProd}`);
        const data = await response.json();

        if (!response.ok) {
            return mostrarMensaje("error", data.message);
        }

        const producto = data.payload[0];
        renderizarProducto(producto);

    } catch (error) {
        console.error("Error al obtener productos: ", error);
        return mostrarMensaje("error", "Error de conexion con el servidor");
    }
});

function renderizarProducto(producto) {
    let htmlProducto = `
        <div class="card-producto">
            <img class="card-img" src="${producto.image}" alt="${producto.name}">
            <h4>${producto.name}</h4>
            <p>${producto.author}</p>
            <p>Id: ${producto.id}</p>
            <p>$ ${producto.price}</p>
            <p>Estado: ${producto.active ? "Activo" : "Inactivo"}</p>
            <button id="btn-eliminar">Eliminar</button>
        </div>
    `;

    contenedorProductos.innerHTML = htmlProducto;

    const btnEliminar = document.getElementById("btn-eliminar");
    btnEliminar.addEventListener("click", () => {
        const confirmacion = confirm("Queres eliminar este producto?");

        if (!confirmacion) {
            alert("Eliminacion cancelada");
        } else {
            eliminarProducto(producto.id);
        }
    });
}

async function eliminarProducto(id) {
    try {
        const response = await fetch(`${urlBase}/api/products/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (!response.ok) {
            return mostrarMensaje("error", data.message);
        }

        return mostrarMensaje("exito", data.message);

    } catch (error) {
        console.error("Error al eliminar producto: ", error);
        return mostrarMensaje("error", "Error de conexion con el servidor");
    }
}