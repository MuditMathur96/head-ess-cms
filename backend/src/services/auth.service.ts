import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User,{IUser} from '@app/models/user';
import { JWTSecret } from '@app/config/config';
import user from '@app/models/user';
/**
 * Authentication service
 */
export default class AuthService{
    /**
     * creates a new user in the database
     * @param email 
     * @param password 
     * @returns string
     */
    public static async register(email:string,password:string):Promise<IUser | null>{
        const existingUser = await User.findOne({email});

        if(existingUser){
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password,12);
        const user = new User({email,password:hashedPassword});
        await user.save();
        return user;
    }
    /**
     * Verifies user and password
     * @param email 
     * @param password 
     * @returns userId of type string or null
     */
    public static async login(email:string,password:string):Promise<string|null>{
        const user = await User.findOne({email});

        if(!user){
            throw new Error("User not found!");
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            throw new Error("Invalid Credentials");
        }

        const token = jwt.sign({userId:user._id},JWTSecret,{
            expiresIn:"1h"
        });

        return token;
    }

    /**
     *  verfies the token 
     * @param token 
     * @returns return json web token payload
     */
    public static verifyToken(token:string):any{
        return jwt.verify(token,JWTSecret);
    }

    /**
     * 
     * @param userId 
     * @returns User or null
     */
    public static async getUserDetails(userId:string):Promise<IUser | null>{
        const user = await User.findById(userId);
        return user;


    }
}