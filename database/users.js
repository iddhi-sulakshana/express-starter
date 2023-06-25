import jwt from "jsonwebtoken";
import { encrypt, validPassword } from "../utils/hash";

let users = [];

export const addUser = async (name, email, password) => {
  name = name.trim().toLowerCase();
  email = email.trim().toLowerCase();
  password = password.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.name === name || user.email === email
  );
  if (existingUser) return { error: "Username or email is taken." };
  password = await encrypt(password);
  const user = { name, email, password };
  users.push(user);
  return { user };
};

export const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
};

export const getUser = (authToken) => {
  const { name, email } = jwt.verify(authToken, process.env.JWT_PRIVATE_KEY);
  const exist = users.find(
    (user) => user.name === name && user.email === email
  );
  if (!exist) return null;
  return { name: exist.name, email: exist.email };
};

export const verifyUser = async (email, password) => {
  let user;
  for (const check of users) {
    if (check.email === email) {
      if (await validPassword(password, check.password)) {
        user = check;
      }
    }
  }
  if (!user) return { error: "Invalid email or password." };
  return { user };
};

export const authToken = (user) => {
  return jwt.sign(
    { name: user.name, email: user.email },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: "6h" }
  );
};
