import mysql2 from "mysql2/promise";
//Este modulo permite usar await
import environments from "../config/environments.js"; //datos del .env pasados por environments

const { database } = environments;
//el pool es para tener varias conexiones abiertas(10 por defecto) para ir reutilizando
const connection = mysql2.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
});

export default connection;