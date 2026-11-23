import express from "express";
import session from "express-session";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRoutes, viewRoutes, authRoutes } from "./src/api/routes/index.js";
import { __dirname, join } from "./src/api/utils/index.js";

const app = express();
app.use(cors());
app.use(loggerUrl);
const { port } = environments;
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.set("view engine", "ejs")
app.set("views", join(__dirname, "src/views"))
app.use(express.static(join(__dirname, "src/public")))
app.use("/dashboard", viewRoutes)

app.get("/", (req, res) => res.send("API de Hojas & Viñetas"))

app.set("view engine", "ejs");

app.use("/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(port,() => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});