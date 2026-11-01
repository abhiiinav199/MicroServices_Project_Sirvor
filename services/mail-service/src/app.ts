import express, { Application } from "express"
import { errorHandler } from "./middlewares/errorHandler.js"
import mailRouter from "./routes/mail.routes.js"

const app: Application = express()
app.use(express.json())

app.use("/api/v1", mailRouter)



app.use(errorHandler)
export default app