import express, { Application } from "express"
import { errorHandler } from "./middlewares/errorHandler.js"
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser"


const app:Application = express ()
app.use(express.json());
app.use(cookieParser())

app.use("/", authRouter)





app.use(errorHandler)

export default app