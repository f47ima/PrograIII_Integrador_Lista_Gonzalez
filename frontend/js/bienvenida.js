const formNombre = document.getElementById("form-nombre");
const inputNombre = document.getElementById("nombre");
const errorNombre = document.getElementById("error-nombre");

formNombre.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = inputNombre.value.trim();

    if (nombre.length < 2) {
        errorNombre.textContent = "El nombre debe tener al menos 2 letras.";
        return;
    }

    if (nombre.length > 40) {
        errorNombre.textContent = "El nombre no puede superar los 40 caracteres.";
        return;
    }

    localStorage.setItem("nombre", nombre);
    window.location.href = "productos.html";
});
