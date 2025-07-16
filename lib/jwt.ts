import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "aku_jelek_dan_aku_bangga";

export function generateToken(userId: number) {
  const token = jwt.sign({ userId }, SECRET_KEY, {
    expiresIn: "31d",
  });
  return token;
}

export function decodeToken(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as {
      userId: number;
      iat: number;
      exp: number;
    };
    return decoded;
  } catch (e) {
    return null;
  }
}
