import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRoutes } from "./src/api/routes/index.js";

const app = express();
app.use(cors());
app.use(loggerUrl);

const { port } = environments;

app.use(express.json());

app.use("/api/products", productRoutes)

app.listen(port,() => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});