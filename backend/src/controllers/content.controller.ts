import {Response,Request} from 'express';
import ContentService
 from '@app/services/content.service';
 import { ContentType } from '@app/models/content';
import { createContentSchema, updateContentSchema } from '@app/schema/contentSchema';
import { generateErrorResponse, generateSuccessResponse } from '@app/utils/response';

 export default class ContentController{

    public static async createContent(req:Request,res:Response){
        
        const {projectId,type,data} = req.body;

        const isValid = createContentSchema.safeParse({projectId,
            contentType:type});

        if(!isValid.success) generateErrorResponse(res,401,isValid.error);
        try{

            const content = await ContentService.createContent(projectId,type,data);
            generateSuccessResponse(res,content);
            return;


        }catch(err:any){
            generateErrorResponse(res,500);
        }
    }
    public static async getContents(req:Request,res:Response){

        const {projectId} = req.body;

        if(!projectId) return generateErrorResponse(res,401,"ProjectId is required");

        try{
            const contents = await ContentService.getContents(projectId);
            return generateSuccessResponse(res,contents); 

        }catch(e:any){
            return generateErrorResponse(res,500,e?.message);
        }


    }
    public static async getContentById(req:Request,res:Response){

        const {contentId} = req.body;

        if(!contentId) return generateErrorResponse(res,401,"contentId is required");

        try{
            const content = await ContentService.getContentById(contentId);
            return generateSuccessResponse(res,content); 

        }catch(e:any){
            return generateErrorResponse(res,500,e?.message);
        }


    }
    public static async updateContent(req:Request,res:Response){

        const {contentId} = req.params;
        const {data} = req.body;

        const isValid = updateContentSchema.safeParse({contentId,data});
        if(!isValid.success) return generateErrorResponse(res,401,isValid.error);


        try{
            const updatedContent = await ContentService.updateContent(contentId,data);
            return generateSuccessResponse(res,updatedContent); 

        }catch(e:any){
            return generateErrorResponse(res,500,e?.message);
        }


    }
    public static async deleteContent(req:Request,res:Response){

        const {contentId} = req.params;

        try{
            const deletedContent = await ContentService.deleteContent(contentId);
            if(!deletedContent) return generateErrorResponse(res,404,"Content not found");
            return generateSuccessResponse(res,{}); 

        }catch(e:any){
            return generateErrorResponse(res,500,e?.message);
        }


    }

 }