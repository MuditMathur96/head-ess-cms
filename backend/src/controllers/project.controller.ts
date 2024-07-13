import { Request,RequestHandler,Response } from "express";
import ProjectService from "@app/services/project.service";
import { getProjectByIdSchema, createProjectSchema,updateProjectSchema, deleteProjectSchema } from "@app/schema/projectSchema";
import { generateErrorResponse, generateSuccessResponse } from "@app/utils/response";

export default class ProjectController{

    public static async createProject(req:Request,res:Response){
        const {name,description} = req.body;
        const {userId}  =req.body;

        try{
            
            const isValid = createProjectSchema.safeParse({name,description,userId});
            
            if(!isValid.success) generateErrorResponse(res,401,isValid.error);

            const project = await ProjectService.createProject(name,description,userId);
            generateSuccessResponse(res,{project},201);

        }catch(e:any){
            generateErrorResponse(res,500,e?.message || undefined);
        }
    }
    public static async getProjects(req:Request,res:Response){
        const {userId} = req.body;

        if(!userId) generateErrorResponse(res,401,"Access Denied");
        try{
            
            

            const projects = await ProjectService.getProjects(userId);
            generateSuccessResponse(res,{projects},200);

        }catch(e:any){
            generateErrorResponse(res,500,e?.message || undefined);
        }
    }
    public static async getProjectById(req:Request,res:Response){
        const {projectId} = req.params;
        const {userId}  =req.body;

        try{
            
            const isValid = getProjectByIdSchema.safeParse({projectId,userId});
            if(!isValid.success) generateErrorResponse(res,401,isValid.error);

            const project = await ProjectService.getProjectById(projectId,userId);
            
            if(!project) generateErrorResponse(res,404,"project not found!");


            generateSuccessResponse(res,{project},200);

        }catch(e:any){
            generateErrorResponse(res,500,e?.message || undefined);
        }
    }
    public static async updateProject(req:Request,res:Response){
        const {projectId} = req.params;
        const {name,description,userId} = req.body;

        try{
            
            const isValid = updateProjectSchema.safeParse({name,description,userId,projectId});
            
            if(!isValid.success) generateErrorResponse(res,403,isValid.error);

            const project = await ProjectService.updateProject(projectId,userId,name,description);
            if(!project) generateErrorResponse(res,404,"project not found!");
            generateSuccessResponse(res,{project},200);

        }catch(e:any){
            generateErrorResponse(res,500,e?.message || undefined);
        }
    }
    public static async deleteProject(req:Request,res:Response){
        const {projectId} = req.params;
        const {userId} = req.body;

        try{
            
            const isValid = deleteProjectSchema.safeParse({projectId,userId})
            
            if(!isValid.success) generateErrorResponse(res,403,isValid.error);

            const project = await ProjectService.deleteProject(projectId,userId);
            if(!project?.deletedCount) generateErrorResponse(res,404,"project not found!");
            generateSuccessResponse(res,{project},200);

        }catch(e:any){
            generateErrorResponse(res,500,e?.message || undefined);
        }
    }

   


}