import axios from './axios-config';

export const createProject = async(name:string)=>{
    const response = await axios.post("/project",{name});
    return response.data.data;
}

export const getProjects = async()=>{
    try{
        const response = await axios.get("/project");
        return response.data.data;
    }catch(err){
        console.log(err);
        alert("Could not get projects")
        return [];
    }
}