import jwt from "jsonwebtoken";
import db from "../utils/db.js";
import { OAuth2Client } from "google-auth-library";
import appleSignin from "apple-signin-auth";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Email/password signup
export async function signup(email, password, first_name, last_name) {
  const hashed = await bcrypt.hash(password, 10);
  const result = await db.query(
    `INSERT INTO users (email, password_hash, first_name, last_name, provider)
     VALUES ($1, $2, $3, $4, $5) RETURNING id, email`,
    [email, hashed, first_name, last_name, "email"]
  );
  const user = result.rows[0];
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
}

// Email/password login
export async function login(email, password) {
  const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = result.rows[0];
  if (!user || !user.password_hash) throw new Error("Invalid credentials");
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error("Invalid credentials");
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
}

// Google Login
export async function loginWithGoogle(idToken) {
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const email = payload.email;
  const external_id = payload.sub;
  const first_name = payload.given_name || "";
  const last_name = payload.family_name || "";
  return await findOrCreateOAuthUser(email, first_name, last_name, "google", external_id);
}

// Apple Login
export async function loginWithApple(idToken) {
  const { email, sub } = await appleSignin.verifyIdToken(idToken, {
    audience: process.env.APPLE_CLIENT_ID,
    ignoreExpiration: true,
  });
  return await findOrCreateOAuthUser(email, "", "", "apple", sub);
}

// Helper: create/find user in DB and return JWT
async function findOrCreateOAuthUser(email, first_name, last_name, provider, external_id) {
  let result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  let user = result.rows[0];

  if (!user) {
    result = await db.query(
      `INSERT INTO users (email, first_name, last_name, provider, external_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, email`,
      [email, first_name, last_name, provider, external_id]
    );
    user = result.rows[0];
  }

  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
}

// Get user profile by ID
export async function getProfile(userId) {
  const result = await db.query(
    "SELECT id, email, first_name, last_name, provider, kyc_status, aml_flag FROM users WHERE id = $1",
    [userId]
  );
  if (!result.rows.length) throw new Error("User not found");
  return result.rows[0];
}