import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";
import { loggerUrl, validateId, validateProduct } from "./src/api/middlewares/middlewares.js";
import { createProduct, getActiveProducts, getAllProducts, getProductById, modifyProduct, removeProduct } from "./src/api/controllers/product.controllers.js";

const app = express();
app.use(cors());
app.use(loggerUrl);

const { port } = environments;

app.use(express.json());

app.get("/", (req, res) => res.send("API de Hojas & Viñetas"))

app.get("/api/products", getAllProducts);

app.get("/api/products/active", getActiveProducts)

app.get("/api/products/:id", validateId, getProductById )

app.post("/api/products", validateProduct, createProduct)

app.put("/api/products", validateProduct, modifyProduct)

app.delete("/api/products/:id",validateId, removeProduct);

app.listen(port,() => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});