import bcrypt from "bcrypt";

export async function encrypt(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}
export async function validPassword(original, hashed) {
  return await bcrypt.compare(original, hashed);
}
