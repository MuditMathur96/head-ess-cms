import Project, { IProject } from '@app/models/project';

export default class ProjectService{
    /**
     * 
     * @param name 
     * @param description 
     * @param userId 
     * @returns 
     */
    public static async createProject(name:string,description:string,userId:string){

        const project = new Project({name,description,userId});
        await project.save();
        return project;
    }
    /**
     * 
     * @param userId 
     * @returns 
     */
    public static async getProjects(userId:string):Promise<IProject[]>{

        const projects = await Project.find({userId});
        return projects;
    }
    /**
     * 
     * @param id  id to project to fetch
     * @param userId logged in user's id
     * @returns  project or null
     */
    public static async getProjectById(id:string,userId:string):Promise<IProject|null>{

        const project = await Project.findById(id);
        return project;
    }
    /**
     * 
     * @param projectId 
     * @param userId 
     * @param name 
     * @param description 
     * @returns 
     */
    public static async updateProject(projectId:string,userId:string,
        name:string,description:string){

        return await Project.findByIdAndUpdate({_id:projectId,userId},
            {name,description},
            {new:true}
        )
    }
    public static async deleteProject(projectId:string,userId:string){

        return await Project.deleteOne({_id:projectId,userId}
        )
    }
}