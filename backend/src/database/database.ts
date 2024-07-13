import mongoose from "mongoose";
import { MONGODBURL,DBRETRIES } from "../config/config";
import { delay } from "../utils/utils";

export async function connectToDB(){
    //check if env variable is available or empty
    if(!MONGODBURL || MONGODBURL.length===0){
        throw new Error("Database url is not available in environment");
    }

    let count =0;
    while(count<DBRETRIES){
        try{
            console.log("Connecting to database...");
            await mongoose.connect(MONGODBURL);
            console.log("Successfully connected to database");
            return;

        }catch{
            count++;
            console.warn("Could not connect to database retrying in 2 seconds...");
            await delay(2000);
        }
    }

    throw new Error("Could not connect to the database")

}