import { configDotenv } from "dotenv";
//load environment variables
configDotenv();

export const MONGODBURL:string = process.env.MONGO_DB_URL || "";
export const DBRETRIES:number = parseInt(process.env.DB_RETRIES || "0");
export const PORT:number = parseInt(process.env.PORT || "");
export const JWTSecret:string = process.env.JWT_SECRET || "secret";