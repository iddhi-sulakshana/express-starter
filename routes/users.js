import express from "express";
import { addUser, authToken, getUser, verifyUser } from "../database/users";

const router = express.Router();

// get user from database
router.get("/", (req, res) => {
  const authToken = req.headers["x-auth-token"];
  if (!authToken)
    return res.status(401).send({ error: "Access denied. No token provided." });
  const user = getUser(authToken);
  if (!user) return res.status(404).send({ error: "User not found!" });
  res.send({ data: user });
});

// signup user
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const { error, user } = await addUser(name, email, password);
  if (error) return res.status(400).send({ error });
  const token = authToken(user);
  res.header("x-auth-token", token).send({ message: "Sign up successfully" });
});

// login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { error, user } = await verifyUser(email, password);
  if (error) return res.status(400).send({ error });
  const token = authToken(user);
  res.header("x-auth-token", token).send({ message: "Login successfully" });
});

export default router;
