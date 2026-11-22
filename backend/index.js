import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
const app = express();
const { port } = environments;

app.use(express.json());

app.get("/", async (req,res)=>{
   try{
    const [resultado] = await connection.query("SELECT * FROM products");
    res.json(resultado);
   }catch(error){
    console.error(error);
    res.status(500).json({message:"Error a conectar con la base de datos"});
   }
})

app.listen(port,() => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});