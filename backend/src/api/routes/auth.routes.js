import express from "express";
import { loginPage, login, createAdmin } from "../controllers/auth.controllers.js";

export const authRoutes = express.Router();

authRoutes.get("/login", loginPage);
authRoutes.post("/login", login);
authRoutes.post("/create-admin", createAdmin);
