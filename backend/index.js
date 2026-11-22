import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
const app = express();
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

app.get("/api/products/:id", async (req,res) => {
    try {
        const id = req.params.id;
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

app.listen(port,() => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});