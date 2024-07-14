import {Request,Response} from 'express';
import SchemaService from '@app/services/schema.service';
import { createSchemaSchema, updateSchemaSchema,schemaId as SchemaIdSchema } from '@app/schema/schemaSchema';
import { generateErrorResponse, generateSuccessResponse } from '@app/utils/response';

export default class SchemaController{

    public static async createSchema(req:Request,res:Response){
        const {projectId,name,fields} = req.body;

        const isValid = createSchemaSchema.safeParse({projectId,name,fields});

        if(!isValid.success) return generateErrorResponse(res,403,isValid.error);

        try{
            const schema = await SchemaService.createSchema(projectId,name,fields);
            return generateSuccessResponse(res,schema,201);
        }catch(e:any){
            return generateErrorResponse(res,500,e.message);
        }
    }
    public static async getSchemas(req:Request,res:Response){
        const {projectId} = req.params;

        if(!projectId) return generateErrorResponse(res,401,"projectId is required");

        try{
            const schemas = await SchemaService.getSchemas(projectId);
            return generateSuccessResponse(res,schemas,201);
        }catch(e:any){
            return generateErrorResponse(res,500,e.message);
        }
    }
    public static async getSchemaById(req:Request,res:Response){
        const {schemaId} = req.params;

        if(!schemaId) return generateErrorResponse(res,401,"schemaId is required");

        try{
            const schema = await SchemaService.getSchemaById(schemaId);
            if(!schema) return generateErrorResponse(res,404,"schema not found");
            return generateSuccessResponse(res,schema,201);
        }catch(e:any){
            return generateErrorResponse(res,500,e.message);
        }
    }
    public static async updateSchema(req:Request,res:Response){
        const {schemaId} = req.params;
        const {name,fields} = req.body;

        const isValid = updateSchemaSchema.safeParse({name,fields,schemaId});
        
        if(!isValid.success) return generateErrorResponse(res,401,isValid.error);

        try{
            const schema = await SchemaService.updateSchema(schemaId,name,fields);
            
            if(!schema) return generateErrorResponse(res,404,"Schema not found");

            return generateSuccessResponse(res,schema);

        }catch(e:any){
            return generateErrorResponse(res,500,e.message);
        }
    }
    public static async deleteSchema(req:Request,res:Response){
        const {schemaId} = req.params;

        const isValid = SchemaIdSchema.safeParse(schemaId);
        
        if(!isValid.success) return generateErrorResponse(res,401,isValid.error);

        try{
            const schema = await SchemaService.deleteSchema(schemaId);
            if(!schema) return generateErrorResponse(res,404,"Schema not found");
            return generateSuccessResponse(res,schema);
        }catch(e:any){
            return generateErrorResponse(res,500,e.message);
        }
    }




}