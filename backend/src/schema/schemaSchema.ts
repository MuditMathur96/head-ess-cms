import { ContentType } from '@app/models/content';
import {z} from 'zod';
import { projectId } from './projectSchema';
export const schemaId = z.string({
    message:"schemaId is required"
});
const fieldSchema =z.object({
    name:z.string(),
    type:z.nativeEnum(ContentType),
    required:z.boolean()
})

export const fields = z.array(fieldSchema);

export const createSchemaSchema= z.object({
    schemaId,
    fields,
    projectId
});

export const updateSchemaSchema = z.object({
    schemaId,
    name:z.string({message:"name is required"}),
    fields
}) 