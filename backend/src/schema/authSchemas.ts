import {z} from 'zod';

export const emailType = z.string().email({
    message:"email must be an valid email"
});
export const passwordType = z.string({
    message:"password is required"
})

export const registerSchema=z.object({
    email:emailType,
    password:passwordType
})

export const loginSchema=z.object({
    email:emailType,
    password:passwordType
})