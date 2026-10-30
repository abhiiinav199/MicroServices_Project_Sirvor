import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"
import { ApiError } from "./ApiError.js"
dotenv.config()

interface IRefreshTokenPayload extends JwtPayload{
    userId: string
}

export const verifyJwtToken = (token:string): IRefreshTokenPayload =>{
     const secret = process.env.REFRESH_TOKEN_JWT_SECRET;
  
  if (!secret) {
    throw new ApiError("REFRESH_TOKEN_JWT_SECRET is not defined in environment variables", 500);
  }
  
  const decoded = jwt.verify(token, secret) as IRefreshTokenPayload;
  return decoded;
};
    
