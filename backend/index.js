import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";
import { loggerUrl, validateId, validateProduct } from "./src/api/middlewares/middlewares.js";

const app = express();
app.use(cors());
app.use(loggerUrl);

const { port } = environments;

app.use(express.json());

app.get("/api/products", async (req,res) => {
    try {
        const [resultado] = await connection.query("SELECT * FROM products")
        if (resultado.length === 0){
            return res.status(404).json({message: "No se encontraron productos"});
        }
        res.status(200).json({
            payload:resultado,
            total: resultado.length
        })
        
    } catch (error) {
        console.log("Error obteniendo productos: ", error);
        res.status(500).json({
            message:"Error interno al obtener productos"
        });        
    }
})

app.get("/api/products/active", async (req,res) => {
    try {
        const [resultado] = await connection.query("SELECT * FROM products WHERE products.active = ?", [1])
        if (resultado.length === 0){
            return res.status(404).json({message: "No se encontraron productos"});
        }
        res.status(200).json({
            payload:resultado,
            total: resultado.length
        })
    } catch (error) {
        console.log("Error obteniendo productos: ", error);
        res.status(500).json({
            message:"Error interno al obtener productos"
        });        
    }
})

app.get("/api/products/:id", validateId, async (req,res) => {
    try {
        const id = req.id;
        const [resultado] = await connection.query("SELECT * FROM products WHERE products.id = ?", [id])
        if (resultado.length === 0){
            return res.status(404).json({message: `No se encontró el producto con id ${id}`});
        }
        res.status(200).json({
            payload:resultado,
            total: resultado.length
        })
    } catch (error) {
        console.log("Error obteniendo productos: ", error);
        res.status(500).json({
            message:"Error interno al obtener productos"
        });        
    }
})

app.post("/api/products", validateProduct, async (req,res) => {
    try {
        const { name, author, image,category, price } = req.body;
        const [resultado] = await connection.query("INSERT INTO products (name, author, image, category, price ) VALUES (?, ?, ?, ?, ?)",[name, author, image,category, price])
        res.status(201).json({
            message: "Producto creado",
            productId: resultado.insertId
            });
        } catch (error) {
        console.log("Error cargando producto: ", error);
        res.status(500).json({
            message:"Error interno al cargar el  producto"
        });        
    }
})
app.put("/api/products", validateProduct, async (req, res) => {
    try {
        const { id, name, author, image, category, price, active } = req.body;
        const [resultado] = await connection.query(
            "UPDATE products SET name = ?, author = ?, image = ?, category = ?, price = ?, active = ? WHERE id = ?",
            [name, author, image, category, price, active, id]
        );
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: `No se encontró el producto con id ${id}` });
        }
        res.status(200).json({ message: "Producto actualizado" });
    } catch (error) {
        console.log("Error actualizando producto: ", error);
        res.status(500).json({ message: "Error interno al actualizar el producto" });
    }
});

app.delete("/api/products/:id",validateId, async (req, res) => {
    try {
        const id = req.id;
        const [resultado] = await connection.query("DELETE FROM products WHERE id = ?", [id]);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: `No se encontró el producto con id ${id}` });
        }
        res.status(200).json({ message: `Producto con id ${id} eliminado` });
    } catch (error) {
        console.log("Error eliminando producto: ", error);
        res.status(500).json({ message: "Error interno al eliminar el producto" });
    }
});

app.listen(port,() => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});