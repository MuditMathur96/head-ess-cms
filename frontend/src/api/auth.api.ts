import axios from "./axios-config";

export const login = async(email:string,password:string)=>{
    try{

        const response = await axios.post("/auth/login",{
            email,password
        });
        if(response.data.result){
            localStorage.setItem("token",response.data.data.token);
            return response.data.data;
        }

        throw new Error(response.data?.error);
    }catch(err:any){
        console.error(err);
        return {
            error:err.response.data.error || "Something went wrong!"
        };
    }
}

export const signup = async(email:string,password:string)=>{
    try{

        const response = await axios.post("/auth/register",{
            email,password
        });
        if(response.data.result){
            return response.data.data;
        }
        throw new Error(response.data?.error);
    }catch(err:any){
        console.error(err);
        return [];
    }
}

export const getUserDetails =async()=>{
    try{

        const res = await axios.get("/auth/me");
        if(res.data.result){
            return res.data.data;
        }
        throw new Error(res.data.error);

    }catch(err:any){
        throw new Error(err.response?.data?.error || "Something went wrong");
    }

}

export const logout = async()=>{
    localStorage.removeItem("token");
}