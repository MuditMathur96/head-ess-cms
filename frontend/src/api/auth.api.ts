import axios from "./axios-config";

export const login = async(email:string,password:string)=>{
    const response = await axios.post("/auth/login",{
        email,password
    });
    if(response.data.result){
        return response.data.data;
    }
}