import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (
    err: Error, // ✅ Type safe: Standard Error base class
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = 500;
    let message = "Internal Server Error";

    // ✅ Type Narrowing: Check karo agar error humara custom ApiError hai
    if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
    } else if (err instanceof Error) {
        message = err.message;
    }

    return res.status(statusCode).json({
        error: true,
        success: false,
        message: message,
    });
};
