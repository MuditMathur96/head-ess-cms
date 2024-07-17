import {Request,Response} from 'express';
import authService from '@app/services/auth.service';

import {loginSchema, registerSchema, userIdSchema} from '@app/schema/authSchemas';
import { generateErrorResponse, generateSuccessResponse } from '@app/utils/response';

export default class AuthController{
    public static async register(req:Request,res:Response):Promise<void>{
        const {email,password} = req.body;

        try{

            const isValid = registerSchema.safeParse({email,password});
            if(!isValid.success){
                generateErrorResponse(res);
            }

            const user = await authService.register(email,password);
            generateSuccessResponse(res,{
                user:user,
            },201);
            
        }catch(e:any){  
            generateErrorResponse(res);
        }
    }

    public static async login(req:Request,res:Response):Promise<void>{
        const {email,password} = req.body;

        try{

            const isValid = loginSchema.safeParse({email,password});
            if(!isValid.success){
                generateErrorResponse(res,400,isValid.error);
            }

            const token = await authService.login(email,password);
            generateSuccessResponse(res,{
                token
            },200);
            
        }catch(e:any){  
            generateErrorResponse(res,500,e.message);
        }
    }
    public static async userDetails(req:Request,res:Response):Promise<void>{
        const {userId} = req.body;
        try{
            const isValid = userIdSchema.safeParse(userId);
            if(!isValid.success){
                generateErrorResponse(res,400,isValid.error);
            }

            const user = await authService.getUserDetails(userId);
            generateSuccessResponse(res,{
                ...user?.toJSON()
            },200);
            
        }catch(e:any){  
            generateErrorResponse(res,500,e.message);
        }
    }


}


