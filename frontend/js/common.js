/*======================
    Funciones compartidas por todas las pantallas
======================*/

// ===== Tema claro / oscuro (se guarda en localStorage para mantenerlo al recargar) =====
if (localStorage.getItem("tema") === "oscuro") {
    document.body.classList.add("oscuro");
}

function cambiarTema() {
    document.body.classList.toggle("oscuro");

    if (document.body.classList.contains("oscuro")) {
        localStorage.setItem("tema", "oscuro");
    } else {
        localStorage.setItem("tema", "claro");
    }
}

// ===== Carrito (se guarda en localStorage como texto JSON) =====
function obtenerCarrito() {
    const carrito = localStorage.getItem("carrito");
    if (carrito === null) {
        return [];
    }
    return JSON.parse(carrito);
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function calcularTotal(carrito) {
    let total = 0;
    carrito.forEach((item) => {
        total += item.price * item.cantidad;
    });
    return total;
}

function formatearPrecio(precio) {
    return "$ " + Number(precio).toLocaleString("es-AR");
}

// Si el cliente no ingreso su nombre, vuelve a la bienvenida
function verificarNombre() {
    if (!localStorage.getItem("nombre")) {
        window.location.href = "index.html";
    }
}

// Borra todo (menos el tema) y vuelve a empezar
function reiniciarAutoservicio() {
    localStorage.removeItem("nombre");
    localStorage.removeItem("carrito");
    localStorage.removeItem("ticket");
    window.location.href = "index.html";
}
