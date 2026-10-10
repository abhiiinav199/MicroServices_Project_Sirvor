import express, { Application } from "express"
import { errorHandler } from "./middlewares/errorHandler.js"
import authRouter from "./routes/auth.routes.js";


const app:Application = express ()
app.use(express.json());

app.use("/", authRouter)





app.use(errorHandler)

export default app