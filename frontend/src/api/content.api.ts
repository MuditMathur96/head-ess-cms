import axios from './axios-config';

export const createContent = async(projectId:string,type:string,data:any)=>{

    const response = await axios.post("/content",{projectId,type,data});
    return response.data;
}

export const getContents = async(projectId:string)=>{
    const response = await axios.get(`/content/${projectId}`);
    return response.data;
}