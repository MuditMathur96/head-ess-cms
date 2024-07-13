import mongoose,{Schema as MongooseSchema,Document} from 'mongoose';
import { ContentType } from './content';
import { string } from 'zod';

export interface ISchema extends Document{
    projectId:string,
    name:string,
    fields:Array<{
        name:string,
        type:ContentType,
        required:boolean
    }>
}

const SchemaSchema:MongooseSchema<ISchema> = new MongooseSchema({
    projectId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    fields:[
        {
            name:{
                type:String,
                required:true
            },
            type:{
                type:String,
                enum:ContentType,
                required:true,
            },
            required:{
                type:Boolean,
                required:true
            }
        }
    ]
},{timestamps:true});

export default mongoose.model<ISchema>("schema",SchemaSchema);