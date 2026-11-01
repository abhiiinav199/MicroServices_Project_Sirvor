import express, { Application, Request, Response, NextFunction } from "express";
import proxy from "express-http-proxy";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import { errorHandler } from "./middlewares/errorHandler.js";
import { loginValidation } from "./middlewares/auth.js";
import { error } from "node:console";
dotenv.config();

const app: Application = express();
app.use(cookieParser())
app.use(cors({ origin: "*", credentials: true })) //process.env.CLIENT_URL
//loggger
app.use((req: Request, res: Response , next : NextFunction)=>{
  console.log(`${req.method} ${req.url}`)
  next()
})

  
const PORT = process.env.PORT || 4001;
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "http://localhost:3001";

// Central Proxy with header decorator (Industry Standard)
const authProxy = proxy(AUTH_SERVICE_URL, {
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    // 1. Sanitize: delete any spoofed header from client
    delete proxyReqOpts.headers["x-user"];

    // 2. Inject verified userId from decoded token if logged in
    if ((srcReq as any).user) {
      proxyReqOpts.headers["x-user"] = JSON.stringify((srcReq as any).user);
    }

    return proxyReqOpts;
  },

  proxyErrorHandler(err: any, res: Response, next: NextFunction) {
    console.log("Proxy Error :", err.message)
    res.status(500).json({
      error:true,
      success:false,
      message:"Auth Service unavailable."
    })
    // next()
  },
});

// Protected routes (apply auth middleware before proxy)
app.use("/api/v1/auth/update-password", loginValidation);

// Forward all /api/v1/auth/* requests to auth-service
app.use("/api/v1/auth", authProxy);

app.use(errorHandler);

const startServer = async (): Promise<void> => {
  try {
    app.listen(PORT, () => {
      console.log(`Gateway service is successfully running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error in connection", error);
  }
};
startServer();
