import UserModels from "../models/user.models.js";
import environments from "../config/environments.js";

const { adminDemo } = environments;

const renderLogin = (res, { error = null, email = "", status = 200 } = {}) => {
    res.status(status).render("login", {
        title: "Ingresar",
        error,
        email,
        adminDemo
    });
};

// GET /login
export const vistaLogin = (req, res) => {
    renderLogin(res);
};

// POST /login
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return renderLogin(res, { error: "Completá el correo y la contraseña", email, status: 400 });
    }

    try {
        const [rows] = await UserModels.selectUserByEmail(email);
        const user = rows[0];

        if (!user || user.password !== password) {
            return renderLogin(res, { error: "Correo o contraseña incorrectos", email, status: 401 });
        }

        // regenerate crea una sesión nueva al loguearse (evita reutilizar una sesión anterior)
        req.session.regenerate((err) => {
            if (err) {
                return renderLogin(res, { error: "Error interno del servidor", email, status: 500 });
            }
            req.session.usuario = { id: user.id, name: user.name, email: user.email };
            res.redirect("/dashboard/principal");
        });
    } catch (error) {
        console.log("Error en login: ", error);
        renderLogin(res, { error: "Error interno del servidor", email, status: 500 });
    }
};

// POST /logout
export const logout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.redirect("/login");
    });
};
