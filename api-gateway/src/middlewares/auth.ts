import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";

interface IAuthPayload extends JwtPayload {
  id: string;
}

export const loginValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token =
      req?.cookies?.token || req?.headers?.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiError("Authentication token is missing", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IAuthPayload

    (req as any).user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

