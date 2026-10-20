import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ApiError } from "./ApiError.js";
dotenv.config();

export interface ITokenPayload {
  userId: unknown;
  email: string;
  role: string;
  fullName: string;
}
export const generateAccessToken =  (payload: ITokenPayload):string => {
        const secret = process.env.JWT_SECRET;
          if (!secret) {
        throw new ApiError("JWT_SECRET  is not defined in environment variables", 500);
    }
  const token = jwt.sign(payload,secret, {
    expiresIn: "5h",
  });
  return token;
};
