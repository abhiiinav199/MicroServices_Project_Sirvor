
export class ApiError extends Error{
    statusCode: number;
    success: boolean;
    error: boolean;

    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode= statusCode;
        this.success = false;
        this.error = true;


         // Clean stack trace ke liye
        Error.captureStackTrace(this, this.constructor);
    }
}