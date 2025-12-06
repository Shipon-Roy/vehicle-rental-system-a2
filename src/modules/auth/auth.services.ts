import config from "../../config";
import { pool } from "../../config/connectDb";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSignup = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  const hashPassword = await bcrypt.hash(password as string, 6);

  const result = await pool.query(
    `INSERT INTO users(name, email, password, phone, role) VALUES($1, $2,$3, $4, $5) RETURNING *`,
    [name, email, hashPassword, phone, role]
  );

  delete result.rows[0].password;

  return result;
};

const userSignin = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);

  if (result.rows.length === 0) {
    return null;
  }

  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return false;
  }

  const secret = config.jwt_secret;
  const token = jwt.sign(
    { name: user.name, email: user.email, role: user.role },
    secret as string,
    { expiresIn: "7d" }
  );

  return { token, user };
};

export const authServices = {
  userSignup,
  userSignin,
};
