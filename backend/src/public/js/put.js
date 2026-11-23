const urlBase = "http://localhost:3000";
const contenedorProductos = document.querySelector(".contenedor-productos");
const contenedorForm = document.querySelector(".contenedor-form");
const getProductForm = document.getElementById("getProductForm");

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
    contenedorProductos.innerHTML = `<p class="mensaje ${tipo}">${mensaje}</p>`;
}

function mostrarListaErrores(array) {
    let htmlErrores = "";
    array.forEach(error => {
        htmlErrores += `<p class="mensaje error">${error}</p>`;
    });

    contenedorProductos.innerHTML = htmlErrores;
}

getProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    contenedorForm.innerHTML = "";

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
            <button id="btn-modificar">Modificar</button>
        </div>
    `;

    contenedorProductos.innerHTML = htmlProducto;

    const btnModificar = document.getElementById("btn-modificar");
    btnModificar.addEventListener("click", () => {
        const confirmacion = confirm("Querés modificar este producto?");

        if (!confirmacion) {
            alert("Modificacion cancelada");
        } else {
            renderizarFormularioPut(producto);
        }
    });
}

function renderizarFormularioPut(producto) {
    let htmlForm = `
        <h3>Modificar producto</h3>

        <form id="modifyProductForm">

            <input type="hidden" name="id" value="${producto.id}">

            <label for="categoryProd">Categoria</label>
            <select name="category" id="categoryProd" required>
                <option value="libro" ${producto.category === "libro" ? "selected" : ""}>Libro</option>
                <option value="comic" ${producto.category === "comic" ? "selected" : ""}>Cómic</option>
            </select>

            <label for="imageProd">Imagen</label>
            <input type="text" name="image" id="imageProd" value="${producto.image}" required>

            <label for="nameProd">Nombre</label>
            <input type="text" name="name" id="nameProd" value="${producto.name}" required>

            <label for="authorProd">Autor</label>
            <input type="text" name="author" id="authorProd" value="${producto.author}" required>

            <label for="priceProd">Precio</label>
            <input type="number" name="price" id="priceProd" min="1" value="${producto.price}" required>

            <label for="activeProd">Estado</label>
            <select name="active" id="activeProd" required>
                <option value="1" ${producto.active ? "selected" : ""}>Activo</option>
                <option value="0" ${producto.active ? "" : "selected"}>Inactivo</option>
            </select>

            <input type="submit" value="Modificar producto">

        </form>
    `;

    contenedorForm.innerHTML = htmlForm;

    const modifyProductForm = document.getElementById("modifyProductForm");

    modifyProductForm.addEventListener("submit", async event => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const formObj = Object.fromEntries(formData.entries());

        formObj.price = Number(formObj.price);
        formObj.active = Number(formObj.active);
        formObj.name = formObj.name.trim();
        formObj.author = formObj.author.trim();

        const errores = validarFormulario(formObj);

        if (errores.length > 0) {
            console.error(errores);
            return mostrarListaErrores(errores);
        }

        try {
            const response = await fetch(`${urlBase}/api/products`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formObj)
            });

            const data = await response.json();

            contenedorForm.innerHTML = "";

            if (!response.ok) {
                if (data.listaErrores) {
                    return mostrarListaErrores(data.listaErrores);
                }
                return mostrarMensaje("error", data.message);
            }

            mostrarMensaje("exito", data.message);

        } catch (error) {
            console.error("Error al modificar producto: ", error);
            return mostrarMensaje("error", "Error de conexion con el servidor");
        }
    });
}