import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRoutes, viewRoutes } from "./src/api/routes/index.js";
import { __dirname, join } from "./src/api/utils/index.js";

const app = express();
app.use(cors());
app.use(loggerUrl);
const { port } = environments;
app.use(express.json());
app.set("view engine", "ejs")
app.set("views", join(__dirname, "src/views"))
app.use(express.static(join(__dirname, "src/public")))
app.use("/dashboard", viewRoutes)

app.get("/", (req, res) => res.send("API de Hojas & Viñetas"))

app.use("/api/products", productRoutes)

app.listen(port,() => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});