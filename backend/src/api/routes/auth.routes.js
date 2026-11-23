import { Router } from "express";
import { vistaLogin, login, logout } from "../controllers/auth.controllers.js";
import { soloInvitados } from "../middlewares/middlewares.js";

const router = Router();

router.get("/login", soloInvitados, vistaLogin);
router.post("/login", soloInvitados, login);
router.post("/logout", logout);

export default router;
