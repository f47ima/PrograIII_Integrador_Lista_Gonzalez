import connection from "../database/db.js";
import crypto from "crypto";

export const getUserByEmail = async (email) => {
  const [rows] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

export const createUser = async (email, password) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const hashedPassword = crypto.scryptSync(password, salt, 64).toString("hex");
  const storedPassword = `${salt}:${hashedPassword}`;

  const [result] = await connection.query(
    "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
    [email, storedPassword, "Admin"]
  );
  return result.insertId;
};

export const verifyPassword = async (password, storedPassword) => {
  const [salt, hash] = storedPassword.split(":");
  const hashedAttempt = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(hashedAttempt));
};
