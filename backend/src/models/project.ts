import mongoose,{Schema,Document} from "mongoose";

export interface IProject extends Document{
    name:string,
    description:string,
    userId:string
}

const ProjectSchema:Schema<IProject> = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    userId:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

export default mongoose.model<IProject>("project",ProjectSchema);