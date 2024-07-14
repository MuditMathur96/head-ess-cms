import { Request,Response,NextFunction } from "express";
import AuthService from "@app/services/auth.service";
import { generateErrorResponse } from "@app/utils/response";


export const authMiddleware = (req:Request,res:Response,next:NextFunction)=>{
   
    const token = req.header("Authorization")?.replace("Bearer ","");
    if(!token){
        return generateErrorResponse(res,401,"Access Denied")
    }

    try{    
        const data = AuthService.verifyToken(token!);
        req.body.userId = data.userId;
        next();

    }catch(e:any){
        console.log(token);
        return generateErrorResponse(res,401,"Invalid Token");

    }
}