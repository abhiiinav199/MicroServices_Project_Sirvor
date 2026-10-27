import express, { Application } from "express"
import cors from "cors"
import { errorHandler } from "./middlewares/errorHandler.js"
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser"


const app:Application = express ()
app.use(express.json());
app.use(cookieParser())
app.use(cors({ origin: "*", credentials: true }))//process.env.CLIENT_URL


app.use("/", authRouter)





app.use(errorHandler)

export default app