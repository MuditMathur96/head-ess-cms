import Content,{IContent,ContentType} from "@app/models/content";

export default class ContentService{

    /**
     * 
     * @param projectId Id of the parent project
     * @param type type of content(enum)
     * @param data can be anything
     * @returns created content
     */
    public static async createContent(projectId:string,type:ContentType,data:any):Promise<IContent>{

        const content = new Content({projectId,type,data});
        await content.save();
        return content;
    }
    /**
     * 
     * @param projectId Id of the parent content
     * @returns  array of contents related to projectId
     */
    public static async getContents(projectId:string):Promise<IContent[]>{

        const contents = await Content.find({projectId});
        return contents;
    }
    /**
     * 
     * @param contentId Id of the content
     * @returns 
     */
    public static async getContentById(contentId:string):Promise<IContent | null>{

        const content = await Content.findById(contentId);
        return content;
    }/**
     * 
     * @param contentId 
     * @param data 
     * @returns updated content document
     */
    public static async updateContent(contentId:string,data:any):Promise<IContent | null>{

        return await Content.findOneAndUpdate({_id:contentId},{data},{new:true});

    }
    public static async deleteContent(contentId:string):Promise<IContent | null>{

        return await Content.findOneAndDelete({_id:contentId});
    }


}
