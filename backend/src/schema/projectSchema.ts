import {z} from 'zod';

export const userId = z.string({
    message:"userId is required"
})
export const projectId=z.string({
    message:"projectId is required"
})

export const createProjectSchema =z.object({
    name:z.string({
        message:"name is required"
    }),
    description:z.string({
        message:"description is required"
    }).optional(),
    userId:userId
});
export const updateProjectSchema =z.object({
    projectId:z.string({
        message:"projectId is required"
    }),
    name:z.string({
        message:"name is required"
    }),
    description:z.string({
        message:"description is required"
    }),
    userId:userId
});

export const deleteProjectSchema = z.object({
    projectId,userId
})

export const getProjectByIdSchema = z.object({
    projectId:z.string({
        message:"projectId is required"
    }),
    userId
})
