import Schema,{ISchema} from '@app/models/schema';

export default class SchemaService{

    public static async createSchema(projectId:string,name:string,fields:any[]):Promise<ISchema |null>{

        const schema= new Schema({
            projectId,
            name,
            fields,

        });
        await schema.save();
        return schema;


    }
    public static async getSchemas(projectId:string):Promise<ISchema[]>{

        const schemas= await Schema.find({projectId});
        return schemas;


    }
    public static async getSchemaById(schemaId:string):Promise<ISchema |null>{

        const schema=await Schema.findById(schemaId);
        return schema;
    }
    public static async updateSchema(schemaId:string,name:string,fields:any[]):Promise<ISchema |null>{

        const schema= Schema.findByIdAndUpdate(schemaId,{name,fields},{new:true});
        return schema;
    }
    public static async deleteSchema(schemaId:string):Promise<ISchema |null>{

        const schema= Schema.findByIdAndDelete(schemaId);
        return schema;
    }


}