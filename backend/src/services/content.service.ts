import Content,{IContent,ContentType} from "@app/models/content";
import { LifecycleHooks } from "@app/types";

export default class ContentService{
    private static hooks:LifecycleHooks={};

    public static registerHooks(hooks:LifecycleHooks):void{
        this.hooks=hooks;
    }


    /**
     * 
     * @param projectId Id of the parent project
     * @param type type of content(enum)
     * @param data can be anything
     * @returns created content
     */
    public static async createContent(projectId:string,type:ContentType,data:any):Promise<IContent>{

        if(this.hooks.beforeSave){
            await this.hooks.beforeSave(data);
        }
        const content = new Content({projectId,type,data});
        await content.save();

        if(this.hooks.afterSave){
            await this.hooks.afterSave(data);
        }
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

        if(this.hooks.beforeSave){
            await this.hooks.beforeSave(data);
        }
        const content = await Content.findOneAndUpdate({_id:contentId},{data},{new:true});

        if(this.hooks.afterSave){
            await this.hooks.afterSave(data);
        }
        return content;
    }
    public static async deleteContent(contentId:string):Promise<IContent | null>{

        const content = Content.findById(contentId);
        if(this.hooks.beforeDelete){
            await this.hooks.beforeDelete(content);
        }
        const deletedContent = await Content.findOneAndDelete({_id:contentId});
        
        if(this.hooks.afterDelete){
            await this.hooks.afterDelete(deletedContent);
        }

        return content;
    }


}
