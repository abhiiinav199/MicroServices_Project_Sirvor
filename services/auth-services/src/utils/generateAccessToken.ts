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
        const ACCESS_TOKEN_JWT_SECRET = process.env.ACCESS_TOKEN_JWT_SECRET;
          if (!ACCESS_TOKEN_JWT_SECRET) {
        throw new ApiError("JWT_SECRET  is not defined in environment variables", 500);
    }
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_JWT_SECRET, {
    expiresIn: "15m",
  });
  return accessToken;
};
