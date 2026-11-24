verificarNombre();

const lista = document.getElementById("lista");
const resumen = document.getElementById("resumen");
const modal = document.getElementById("modal-confirmar");

document.getElementById("resumen-cliente").textContent = localStorage.getItem("nombre");

function mostrarCarrito() {
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        lista.innerHTML = `
            <div class="vacio">
                <p>Tu carrito está vacío.</p>
                <a class="btn btn--primario" href="productos.html">Ver productos</a>
            </div>
        `;
        resumen.style.display = "none";
        return;
    }

    let html = "";
    carrito.forEach((item) => {
        html += `
            <div class="item-carrito">
                <div>
                    <h2 class="item-carrito__nombre">${item.name}</h2>
                    <p class="texto-suave">${item.author}</p>
                    <p class="texto-suave">${formatearPrecio(item.price)} c/u</p>
                </div>
                <div class="item-carrito__controles">
                    <div class="stepper">
                        <button onclick="cambiarCantidad(${item.id}, -1)">-</button>
                        <span>${item.cantidad}</span>
                        <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
                    </div>
                    <strong>${formatearPrecio(item.price * item.cantidad)}</strong>
                    <button class="btn btn--texto btn--peligro-texto" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
                </div>
            </div>
        `;
    });

    lista.innerHTML = html;
    resumen.style.display = "block";
    document.getElementById("resumen-total").textContent = formatearPrecio(calcularTotal(carrito));
}

// Suma o resta una unidad; si queda en 0 se saca del carrito
function cambiarCantidad(id, cambio) {
    let carrito = obtenerCarrito();
    const item = carrito.find((item) => item.id === id);

    item.cantidad += cambio;
    if (item.cantidad > 99) {
        item.cantidad = 99;
    }
    if (item.cantidad <= 0) {
        carrito = carrito.filter((item) => item.id !== id);
    }

    guardarCarrito(carrito);
    mostrarCarrito();
}

function eliminarDelCarrito(id) {
    const carrito = obtenerCarrito().filter((item) => item.id !== id);
    guardarCarrito(carrito);
    mostrarCarrito();
}

// ===== Modal de confirmacion =====
function abrirModal() {
    document.getElementById("total-modal").textContent = formatearPrecio(calcularTotal(obtenerCarrito()));
    modal.showModal();
}

function cerrarModal() {
    modal.close();
}

function confirmarCompra() {
    const carrito = obtenerCarrito();

    // El ticket es solo informativo: se arma con los datos del carrito
    const ticket = {
        cliente: localStorage.getItem("nombre"),
        fecha: new Date().toLocaleString("es-AR"),
        items: carrito,
        total: calcularTotal(carrito)
    };

    localStorage.setItem("ticket", JSON.stringify(ticket));
    localStorage.removeItem("carrito");
    window.location.href = "ticket.html";
}

mostrarCarrito();
