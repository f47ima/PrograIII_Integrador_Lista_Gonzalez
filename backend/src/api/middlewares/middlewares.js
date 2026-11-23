/*======================
    Middlewares
======================*/

// Middleware logger para analizar por consola todas las solicitudes
const loggerUrl = (req, res, next) => {
    const fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    next(); 
};


// Middleware de ruta para filtrar ids no validos
const validateId = (req, res, next) => {
    const id = Number(req.params.id); 
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "El id debe ser un numero entero positivo"
        });
    }
    req.id = id;
    next(); 
}


// Middleware de ruta para validar los campos de un formulario
const validateProduct = (req, res, next) => {
    const categoriasValidas = ["libro", "comic"];
    const errores = []; 
    const { name, author, image, price, category } = req.body;

    if (!name || !image || !price || !category || !author) {
        errores.push("Faltan campos requeridos");
    }

    if (typeof name !== "string" || name.trim().length < 2) {
        errores.push("El nombre debe tener al menos dos caracteres");
    }

    if (typeof price !== "number" || price <= 0) {
        errores.push("El precio debe ser un numero mayor a 0");
    }

    if (!categoriasValidas.includes(category)) {
        errores.push("Categoria invalida")
    }

    if (typeof author !== "string" || author.trim().length < 2) {
        errores.push("El autor debe tener al menos dos caracteres");
    }


    if (errores.length > 0) {
        return res.status(400).json({
            message: "Datos invalidos",
            listaErrores: errores
        });
    }

    next(); 
}

// Middleware de ruta: solo deja pasar a administradores logueados
const requiereAdmin = (req, res, next) => {
    if (req.session.usuario) return next();
    res.redirect("/login");
}


// Middleware de ruta: si ya hay sesion, no tiene sentido mostrar el login
const soloInvitados = (req, res, next) => {
    if (req.session.usuario) return res.redirect("/dashboard/principal");
    next();
}

export {
    loggerUrl,
    validateId,
    validateProduct,
    requiereAdmin,
    soloInvitados
}