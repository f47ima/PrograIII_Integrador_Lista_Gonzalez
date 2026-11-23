import connection from "../database/db.js";

const selectUserByEmail = (email) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    return connection.query(sql, [email]);
}

const insertUser = (name, email, password) => {
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    return connection.query(sql, [name, email, password]);
}

export default {
    selectUserByEmail,
    insertUser
}
