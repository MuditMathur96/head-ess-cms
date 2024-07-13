import { Response } from "express";
/**
 * 
 * @param res Response object
 * @param data Data to send to the user
 * @param statusCode defaults to 200
 * @param message Message (specific to each request)
 */
export function generateSuccessResponse(res:Response,
    data:any,
    statusCode:number=200,
    message:string="request completed successfully",
){

        return res.status(statusCode).json({
            result:true,
            data,
            message,
        })


}
/**
 * 
 * @param res Response object from express
 * @param statusCode Defaults to 500
 * @param message Error message (specific to each request)
 * @returns 
 */
export function generateErrorResponse(res:Response,
    statusCode:number=500,
    message:any="request failed",
){

        return res.status(statusCode).json({
            result:false,
            error:message,
        })


}