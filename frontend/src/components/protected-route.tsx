import { getUserDetails } from '@/api/auth.api';
import { useAppDispath, useAppSelector } from '@/hooks';
import useGetData from '@/hooks/useGetData';
import { login, logout, updateLoading } from '@/store/authSlice';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { ReactNode, useEffect } from 'react';
import {Navigate, useNavigate} from 'react-router-dom';

type Props = {
    children:ReactNode
}

export const AuthLoading = ({children}:{children:ReactNode})=>{
    const authState = useAppSelector(state=>state.auth);
    const navigate = useNavigate();
    const {loading,data,error} = useGetData("/auth/me");

   


    const dispatch = useAppDispath();
    useEffect(()=>{
        console.log("loading=>",loading);
        console.log("user =>",data);
        console.log("error=>",error);

        if(!loading){
            if(data){
                dispatch(login({
                    email:data?.email,
                    role:"admin"
                }))
            }
            dispatch(updateLoading(false));
        }
       
    },[loading])

    if(authState.loading){
        return <>{children}</>
    }
    return null;

}
export const LoggedOut = ({children}:{children:ReactNode})=>{
    const authState = useAppSelector(state=>state.auth);
    

    if(!authState.loading){
        if(!authState.authenticated){
            return <>{children}</>
        }else{
            return null;
        }
    }
    return null;

}

export const LoggedIn = ({children}:{children:ReactNode})=>{
    const authState = useAppSelector(state=>state.auth);

    if(!authState.loading){
        if(authState.authenticated){
            return <>{children}</>
        }else{
            return null;
        }
    }
    return null;

}

function ProtectedRoute({children}: Props) {
   
  return (
    <>
        <AuthLoading>
            <div>Loading...</div>
        </AuthLoading>

        <LoggedIn>
            {children}
        </LoggedIn>

        <LoggedOut>
            <Navigate  to="/login"/>
        </LoggedOut>
    </>
  )
}

export default ProtectedRoute