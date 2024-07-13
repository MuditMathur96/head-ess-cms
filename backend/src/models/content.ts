import mongoose,{Schema,Document} from 'mongoose';

export enum ContentType{
    TEXT = 'text',
    IMAGE = 'image',
    DROPDOWN = 'dropdown',
    RICH_TEXT = "rich-text"
}

export interface IContent extends Document{
    projectId:string,
    type:ContentType,
    data:any
}

const ContentSchema:Schema<IContent> = new Schema<IContent>({
    projectId:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:ContentType,
        required:true
    },
    data:{
        type:Schema.Types.Mixed,
        required:true
    }
},{timestamps:true});

export default mongoose.model<IContent>("content",ContentSchema);