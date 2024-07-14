import axios from './axios-config';

export const createSchema = async(projectId:string,name:string,fields:any[])=>{

    const response = await axios.post("/schema",{projectId,name,fields});
    return response.data;
}

export const getSchemas = async(projectId:string)=>{
    const response = await axios.get(`/schema/${projectId}`);
    return response.data;
}