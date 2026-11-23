import dotenv from "dotenv";
dotenv.config(); 

export default {
    port: process.env.PORT || 3001,
    sessionSecret: process.env.SESSION_SECRET || "secreto-de-desarrollo",
    // Credenciales del boton "Acceso rapido" del login
    adminDemo: {
        name: "Administrador",
        email: "admin@hojasyvinetas.com",
        password: "admin1234"
    },
    database: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
}