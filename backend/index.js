import express from "express";
import environments from "./src/api/config/environments.js";

const app = express();
const { port } = environments;

app.use(express.json());

app.get("/", (req,res) => {
    res.send("Probando")
})

app.listen(port,() => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});