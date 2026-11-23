import express from "express";
import session from "express-session";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { loggerUrl, requiereAdmin } from "./src/api/middlewares/middlewares.js";
import { productRoutes, viewRoutes, authRoutes, userRoutes } from "./src/api/routes/index.js";
import { __dirname, join } from "./src/api/utils/index.js";

const app = express();
app.use(cors());
app.use(loggerUrl);
const { port, sessionSecret } = environments;
app.use(express.json());
// Para leer los datos que manda el formulario de login
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false
}));
// El usuario logueado queda disponible en todas las vistas EJS
app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario || null;
    next();
});
app.set("view engine", "ejs")
app.set("views", join(__dirname, "src/views"))
app.use(express.static(join(__dirname, "src/public")))

app.get("/", (req, res) => res.redirect("/login"))

app.use("/", authRoutes)
app.use("/dashboard", requiereAdmin, viewRoutes)

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)

app.listen(port,() => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});