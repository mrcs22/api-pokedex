import jwt from "jsonwebtoken";

export default function generateToken(userId: number) {
  const data = { userId };
  const secretKey = process.env.JWT_SECRET;
  const config = { expiresIn: 60 * 60 * 24 };

  return jwt.sign(data, secretKey, config);
}
