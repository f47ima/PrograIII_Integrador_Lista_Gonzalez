import UserModels from "../models/user.models.js";

// POST /api/users
export const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Faltan campos requeridos: name, email y password"
        });
    }

    try {
        const [rows] = await UserModels.selectUserByEmail(email);
        if (rows.length > 0) {
            return res.status(409).json({
                message: "Ya existe un usuario con ese correo"
            });
        }

        const [result] = await UserModels.insertUser(name, email, password);

        res.status(201).json({
            message: "Usuario creado",
            userId: result.insertId
        });
    } catch (error) {
        console.log("Error creando usuario: ", error);
        res.status(500).json({
            message: "Error interno al crear el usuario"
        });
    }
};
