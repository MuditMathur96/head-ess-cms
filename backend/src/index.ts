import { MONGODBURL } from "./config/config";
import { connectToDB } from "./database/database";
import { startServer } from "./server/server";

//Entrypoint to application
(async function(){

    console.log(MONGODBURL);
    //connect to database
    await connectToDB();

    //start HTTP server
    startServer();
})()