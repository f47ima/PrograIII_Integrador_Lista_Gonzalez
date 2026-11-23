verificarNombre();

let productos = [];
let categoriaActual = "libro";

const grilla = document.getElementById("grilla");
const mensaje = document.getElementById("mensaje");

document.getElementById("saludo").textContent = "Hola, " + localStorage.getItem("nombre");

// Trae los productos activos desde la API
async function obtenerProductos() {
    try {
        const respuesta = await fetch(API_URL + "/api/products/active");

        // La API responde 404 cuando no hay productos activos
        if (respuesta.status === 404) {
            productos = [];
        } else {
            const datos = await respuesta.json();
            productos = datos.payload;
        }

        mostrarProductos();
    } catch (error) {
        console.log("Error obteniendo productos: ", error);
        mensaje.textContent = "No se pudieron cargar los productos. Verificá que el servidor esté encendido.";
    }
}

function mostrarProductos() {
    // Solo los productos de la categoria elegida
    const filtrados = productos.filter((producto) => producto.category === categoriaActual);

    const carrito = obtenerCarrito();
    let html = "";

    filtrados.forEach((producto) => {
        // Cuantas unidades de este producto hay en el carrito
        let enCarrito = 0;
        carrito.forEach((item) => {
            if (item.id === producto.id) {
                enCarrito = item.cantidad;
            }
        });

        html += `
            <div class="producto">
                <img class="producto__imagen" src="${API_URL}${producto.image}" alt="${producto.name}">
                <div class="producto__cuerpo">
                    <h2 class="producto__nombre">${producto.name}</h2>
                    <p class="producto__autor">${producto.author}</p>
                    <p class="producto__precio">${formatearPrecio(producto.price)}</p>
                    <div class="producto__acciones">
                        <div class="stepper">
                            <button onclick="restarCantidad(${producto.id})">-</button>
                            <span id="cantidad-${producto.id}">1</span>
                            <button onclick="sumarCantidad(${producto.id})">+</button>
                        </div>
                        <button class="btn btn--primario" onclick="agregarAlCarrito(${producto.id})">Agregar</button>
                    </div>
                    <p class="producto__en-carrito">En el carrito: ${enCarrito}</p>
                    <button class="btn btn--texto btn--peligro-texto" onclick="quitarDelCarrito(${producto.id})">Quitar</button>
                </div>
            </div>
        `;
    });

    grilla.innerHTML = html;

    if (filtrados.length === 0) {
        mensaje.textContent = "No hay productos disponibles en esta categoría.";
    } else {
        mensaje.textContent = "";
    }
}

// ===== Cantidad a agregar (entre 1 y 99) =====
function sumarCantidad(id) {
    const span = document.getElementById("cantidad-" + id);
    const cantidad = Number(span.textContent);
    if (cantidad < 99) {
        span.textContent = cantidad + 1;
    }
}

function restarCantidad(id) {
    const span = document.getElementById("cantidad-" + id);
    const cantidad = Number(span.textContent);
    if (cantidad > 1) {
        span.textContent = cantidad - 1;
    }
}

// ===== Carrito =====
function agregarAlCarrito(id) {
    const producto = productos.find((producto) => producto.id === id);
    const cantidad = Number(document.getElementById("cantidad-" + id).textContent);

    const carrito = obtenerCarrito();
    const item = carrito.find((item) => item.id === id);

    if (item) {
        item.cantidad += cantidad;
    } else {
        carrito.push({
            id: producto.id,
            name: producto.name,
            author: producto.author,
            price: Number(producto.price),
            cantidad: cantidad
        });
    }

    guardarCarrito(carrito);
    mostrarProductos();
}

function quitarDelCarrito(id) {
    const carrito = obtenerCarrito().filter((item) => item.id !== id);
    guardarCarrito(carrito);
    mostrarProductos();
}

// ===== Categorias =====
function cambiarCategoria(categoria) {
    categoriaActual = categoria;

    document.getElementById("tab-libro").classList.remove("activo");
    document.getElementById("tab-comic").classList.remove("activo");
    document.getElementById("tab-" + categoria).classList.add("activo");

    mostrarProductos();
}

obtenerProductos();
