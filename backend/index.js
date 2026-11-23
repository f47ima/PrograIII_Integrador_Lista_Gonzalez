import express from "express";
import session from "express-session";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRoutes, authRoutes } from "./src/api/routes/index.js";

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

app.set("view engine", "ejs");

app.use("/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(port,() => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});