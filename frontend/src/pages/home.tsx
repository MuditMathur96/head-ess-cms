import { Button } from '@/components/ui/button'
import useFormHook from '@/hooks/useFormHook';
import { Lock, LucideIcon,  UserRound } from 'lucide-react'
import React, { HTMLInputTypeAttribute, useState } from 'react'

import {z, ZodIssue} from 'zod';

type Props = {}
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


const Errors = ({errors}:{errors:ZodIssue[]})=>{
  return (<div className='w-full'>
    {
      errors.map((err)=>{
        return (<p
        className='text-red-400 text-left'
        >{err.message}!</p>)
      })
    }
  </div>)
}

const LoginFormType= z.object({
  email:z.string().email({message:"Email must be a valid email"}),
  password:z.string().min(8,{
    message:"Password must be atleast 8 characters long"
  }).max(32,{
    message:"Password must be less than 32 characters"
  })
});
const DEFAULTSTATE ={
  email:"",
  password:""
}

function Home({}: Props) {

  const [formData,setFormData] = useState<z.infer<typeof LoginFormType>>(DEFAULTSTATE);
  const {verify,errors} = useFormHook({schema:LoginFormType});



  const handleInputChange = (key:keyof typeof formData,value:any)=>{
    setFormData(prev=>({...prev,[key]:value}));

    
  }
  const handleSubmit = (e:React.FormEvent)=>{
    e.preventDefault();
    const isValid = verify(formData);
    if(!isValid) return;  
  
  }

  return (
    <div className=' w-full h-full
     flex flex-col md:flex-row justify-center items-center 
    '>
      <div 
      className='md:h-full md:w-1/2 
      flex items-center justify-center
      md:bg-gradient-to-r  md:from-red-100 md:to-slate-100
      '>
      <h1
      className='text-4xl text-center font-bold mb-8'
      >Login</h1>
      </div>
      <div
      className='md:w-1/2 
      flex items-center justify-center md:p-4 '
      >

        <form
        className='  flex flex-col items-center justify-start
        gap-4 w-full md:w-[420px]'
        >
         
          <Input
          type="text"
          name="email"
          value={formData.email}
          onChange={(e)=>handleInputChange("email",e.target.value)}
          placeholder='Enter your email'
          icon={UserRound}
          required

          />
          <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={(e)=>{handleInputChange("password",e.target.value)}}
          placeholder='Enter password'
          icon={Lock}
          required

          />
           {errors?.length?<Errors errors={errors}/>:null}
          <Button 
          className='w-full' 
          onClick={handleSubmit}>Submit</Button>
          <p>Don't have an account?</p>
          
        </form>
      </div>
    </div>
  )
}

export default Home