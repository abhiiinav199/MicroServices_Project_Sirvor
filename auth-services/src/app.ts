import express, { Application } from "express"
import { errorHandler } from "./middlewares/errorHandler.js"


const app:Application = express ()
app.use(express.json());





app.use(errorHandler)

export default app