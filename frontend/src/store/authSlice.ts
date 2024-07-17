import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type User={
    email:string,
    role?:string
}
export interface AuthState{
    loading:boolean,
    authenticated:boolean,
    userDetails:User | null
}

const INITIAL_STATE:AuthState={
    loading:true,
    authenticated:false,
    userDetails:null
}

export const authSlice = createSlice({
    name:"authState",
    initialState:INITIAL_STATE,
    reducers:{
        login:(state,action:PayloadAction<User>)=>{
            state.authenticated=true;
            state.userDetails = action.payload
        },
        logout:(state)=>{
            state.authenticated=false;
            state.userDetails=null;
        },
        updateLoading:(state,action:PayloadAction<boolean>)=>{
            state.loading=action.payload;
        }
    }

})

export const {login,logout,updateLoading} = authSlice.actions;
export default authSlice.reducer;