// Boton "Acceso rapido": completa el formulario con los datos del admin de prueba
const accesoRapido = document.getElementById("acceso-rapido");

accesoRapido.addEventListener("click", () => {
    document.getElementById("email").value = accesoRapido.dataset.email;
    document.getElementById("password").value = accesoRapido.dataset.password;
    document.getElementById("password").focus();
});
