const urlBase = "http://localhost:3000";
const contenedorProductos = document.querySelector(".contenedor-productos");
const createProductForm = document.getElementById("createProductForm");

function validarFormulario(data) {
    const errores = [];

    if (!data.name || !data.author || !data.price || !data.image || !data.category) {
        errores.push("Faltan campos requeridos");
    }

    if (data.name.length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    if (data.author.length < 2) {
        errores.push("El autor debe tener al menos 2 caracteres");
    }

    if (data.price < 0) {
        errores.push("El precio debe ser un numero entero mayor a 0");
    }

    return errores;
}

function mostrarMensaje(tipo, mensaje) {
    contenedorProductos.innerHTML = `
        <p class="mensaje ${tipo}">${mensaje}</p>
    `;
}

function mostrarListaErrores(array) {
    let htmlErrores = "";
    array.forEach(error => {
        htmlErrores += `<p class="mensaje error">${error}</p>`;
    });

    contenedorProductos.innerHTML = htmlErrores;
}

createProductForm.addEventListener("submit", async event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formObj = Object.fromEntries(formData.entries());

    formObj.price = Number(formObj.price);
    formObj.name = formObj.name.trim();
    formObj.author = formObj.author.trim();

    const errores = validarFormulario(formObj);

    if (errores.length > 0) {
        console.error(errores);
        return mostrarListaErrores(errores);
    }

    try {
        const response = await fetch(`${urlBase}/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formObj)
        });

        const data = await response.json();

        if (!response.ok) {
            if (data.listaErrores) {
                return mostrarListaErrores(data.listaErrores);
            }
            return mostrarMensaje("error", data.message);
        }

        let mensaje = `${data.message} con id ${data.productId}`;
        mostrarMensaje("exito", mensaje);

    } catch (error) {
        console.error("Error al crear producto: ", error);
        return mostrarMensaje("error", "Error de conexion con el servidor");
    }
});