import express, { Application } from "express"
import proxy from "express-http-proxy"
import dotenv from "dotenv"
dotenv.config()

const app:Application = express()
const PORT = process.env.PORT|| 4001

app.use("/api/v1/auth", proxy("http://localhost:3000"))


const startServer = async (): Promise<void> => {
  try {
    app.listen(PORT, () => {
      console.log(`Gateway service is succesfully running at port number: "http://localhost:${PORT}"`);
    });
  } catch (error) {
    console.log("Error in connection",error);
  }
};
startServer();
