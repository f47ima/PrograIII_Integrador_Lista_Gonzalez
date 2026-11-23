import ProductModels from "../models/product.models.js";
// Vista principal
export const vistaPrincipal = async (req, res) => {
    try {
    // Le pedimos al modelo de productos que nos devuelva todos los productos disponibles
        const [rows] = await ProductModels.selectAllProducts();
        // filter recorre el array y se queda solo con los que cumplen la condición
        const libros = rows.filter((producto) => producto.category === "libro");
        const comics = rows.filter((producto) => producto.category === "comic");

        res.render("index", {
            title: "Principal",
            libros, // es lo mismo que libros: libros
            comics,
        });
    } catch (error) {
        console.log("Error obteniendo productos: ", error);

        res.status(500).json({
        message: "Error interno al obtener productos",
        });
    }
};

export const vistaConsultar = (req, res) => {
    res.render("get", { title: "Consultar" });
};

// Vista crear
export const vistaCrear = (req, res) => {
    res.render("post", {
        title: "Crear",
        about: "Crear producto"
    });
};

// Vista modificar
export const vistaModificar = (req, res) => {
    res.render("put", {
        title: "Modificar"
    });
};

// Vista eliminar
export const vistaEliminar = (req, res) => {
    res.render("delete", {
        title: "Eliminar"
    });
};