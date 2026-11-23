import { getUserByEmail, createUser, verifyPassword } from "../models/user.models.js";

export const loginPage = (req, res) => {
  res.render("login", { error: null });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render("login", { error: "Email y contraseña son requeridos" });
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res.render("login", { error: "Email o contraseña incorrectos" });
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return res.render("login", { error: "Email o contraseña incorrectos" });
    }

    req.session.userId = user.id;
    req.session.email = user.email;
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error("Error en login:", error);
    res.render("login", { error: "Error interno del servidor" });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son requeridos" });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "El email ya existe" });
    }

    const userId = await createUser(email, password);

    res.status(201).json({
      message: "Admin creado exitosamente",
      userId,
      email,
    });
  } catch (error) {
    console.error("Error creando admin:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
