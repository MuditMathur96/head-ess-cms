import { useEffect, useState } from "react";
import axios from '@/api/axios-config';

interface IDataState{
    data: any | null;
    loading:boolean;
    error:any | null;
}


const useGetData = (url:string)=>{

    const [state,setState] = useState<IDataState>({
        data:null,
        loading:true,
        error:null
    });
    const [isMounted,setIsMounted] = useState<boolean>(false);

    useEffect(()=>{
        setIsMounted(true);

        return ()=>{
            setIsMounted(false);
        }

    },[]);

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const res = await axios.get(url);
                console.log("res=>",res.data.data);
                if(res.data.result && isMounted){
                    setState({
                        loading:false,
                        data:res.data.data,
                        error:null
                    });
                }
            }catch(err:any){
                if(isMounted){
                    setState({
                        loading:false,
                        error: new Error(err.response?.data?.error || "something went wrong"),
                        data:null
                    })
                }
            }
        }


        if(isMounted) fetchData();

    },[url,isMounted]);

    return state;

}

export default useGetData