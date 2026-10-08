import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
dotenv.config();

const PORT = process.env.PORT || 3001;

const startServer = async (): Promise<void> => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Auth service is succesfully running at port number: "http://localhost:${PORT}"`);
    });
  } catch (error) {
    console.log("Error in connection",error);
    process.exit(1)
  }
};
startServer();
