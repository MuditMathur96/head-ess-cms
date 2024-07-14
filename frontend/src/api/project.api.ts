import axios from './axios-config';

export const createProject = async(name:string)=>{
    const response = await axios.post("/project",{name});
    return response.data;
}

export const getProjects = async()=>{
    const response = await axios.get("/project");
    return response.data.data;
}