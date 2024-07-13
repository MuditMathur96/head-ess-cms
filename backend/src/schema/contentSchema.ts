import {z} from 'zod';
import { ContentType } from '@app/models/content';
import { projectId } from './projectSchema';

const contentId = z.string({
    message:"contentId is required"
});

const contentType = z.nativeEnum(ContentType);

export const createContentSchema= z.object({
    projectId,
    contentType
});

export const updateContentSchema = z.object({
    contentId,
    data:z.any({
        message:"data cannot be empty or undefined"
    })
})