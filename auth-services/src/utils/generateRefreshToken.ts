import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import { ApiError } from "./ApiError.js";
import { ITokenPayload } from "./generateAccessToken.js";
dotenv.config();

export const generateRefreshToken = (payload: ITokenPayload): string => {

  const REFRESH_TOKEN_JWT_SECRET = process.env.REFRESH_TOKEN_JWT_SECRET;
  if (!REFRESH_TOKEN_JWT_SECRET) {
    throw new ApiError("JWT_SECRET  is not defined in environment variables", 500);
  }
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_JWT_SECRET, {
    expiresIn: "7d",
  });
  return refreshToken;
};
