import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export enum ContentType{
    TEXT = 'text',
    IMAGE = 'image',
    DROPDOWN = 'dropdown',
    RICH_TEXT = "rich-text"
}
export type fieldType={
    name:string,
    type:string,
    required:boolean
}
export type Content ={
    projectId:string,
    type:ContentType,
    data:any

}

export type Schema={
    name:string,
    projectId:string,
    fields:fieldType[]

}

export type Project={
    _id:string,
    name:string,
    description:string,
    schemas:Schema

}

export type ProjectState={
    loading:boolean
    projects:Project[] 
    content:Content[] 
}

const INITIAL_STATE:ProjectState={
    loading:true,
    projects:[],
    content:[]
}

export const  projectSlice= createSlice({
    name:"projectState",
    initialState:INITIAL_STATE,
    reducers:{
        setLoading:(state,action:PayloadAction<boolean>)=>{
            state.loading=action.payload;
        },
        setProjects:(state,action:PayloadAction<Project[]>)=>{
            state.projects=action.payload;
        },
        setContent:(state,action:PayloadAction<Content[]>)=>{
            state.content=action.payload;
        }
    }
});

export const {setProjects,setContent,setLoading} = projectSlice.actions;
export default projectSlice.reducer;

