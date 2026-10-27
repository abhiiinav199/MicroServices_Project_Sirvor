import dotenv from "dotenv";
dotenv.config();
import { createClient, RedisClientType } from "redis";
import { ApiError } from "../utils/ApiError.js";

let client:RedisClientType;
export const redisConnect = async () => {
  if (
    !process.env.REDIS_PASSWORD ||
    !process.env.REDIS_HOST ||
    !process.env.REDIS_PORT
  ) {
    throw new ApiError(
      "Please provide REDIS_PASSWORD, REDIS_HOST, REDIS_PORT",
      400,
    );
  }

   client = createClient({
    username: "default",
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
  });

  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();

  console.log("Auth Service redis connected successfully"); 
};


const getRedisClient = ()=>{
    if(!client){
        throw new Error("Redis Client not intialized")
    }

    return client;
}