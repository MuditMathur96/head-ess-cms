import { LucideIcon } from "lucide-react";
import { HTMLInputTypeAttribute, useState } from "react";

type InputProps ={
    type:HTMLInputTypeAttribute,
    name:string,
    value:any,
    onChange:React.ChangeEventHandler<HTMLInputElement>,
    placeholder:string,
    icon?:LucideIcon,
    required?:boolean
  
  
  }
  

const Input =({icon:Icon,...props}:InputProps)=>{

    const [isFocused,setIsFocused] = useState<boolean>(false);
  
    return (<div
    className='w-full
    flex items-center gap-2
  
    '
    >
      {Icon && <Icon
      className='text-slate-300'
      />}
      <div className='w-full'>
      <input  
      onFocus={()=>setIsFocused(true)}
      onBlur={()=>setIsFocused(false)}
      className='w-full bg-transparent 
      p-2 duration-200
      outline-none '
      {...props}
      />
       <div className={`h-[2px] w-full
      ${isFocused?"md:bg-gradient-to-r  md:from-red-100 md:to-blue-100"
        :"bg-gray-200"}
        duration-200
      
      `}></div>
      </div>
    </div>) 
  
  
  }

  export default Input;