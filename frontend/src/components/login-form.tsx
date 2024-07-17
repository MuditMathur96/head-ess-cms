import { Button } from '@/components/ui/button'
import useFormHook from '@/hooks/useFormHook';
import { Lock,UserRound } from 'lucide-react'
import { login } from '@/store/authSlice';

import { login as LoginApi } from '@/api/auth.api';

import Input from '@/components/input';
import Errors from '@/components/form-errors';

import {z} from 'zod';
import { useState } from 'react';
import { useAppDispath } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './shared/auth-layout';
import { useQueryClient } from '@tanstack/react-query';


const LoginFormType= z.object({
  email:z.string().email({message:"Invalid email"}),
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

function LoginForm() {

  const [formData,setFormData] = useState<z.infer<typeof LoginFormType>>(DEFAULTSTATE);
  const {verify,errors} = useFormHook({schema:LoginFormType});
  const dispatch =  useAppDispath();
  const queryClient = useQueryClient();

  const navigate = useNavigate();


  const handleInputChange = (key:keyof typeof formData,value:any)=>{
    setFormData(prev=>({...prev,[key]:value}));

    
  }
  const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault();
    const isValid = verify(formData);
    if(!isValid) return;  
    const result = await LoginApi(formData.email,formData.password);
    if(result.error){
       alert(result.error)
       return;
    }
    // dispatch(login({
    //     email:formData.email,
    //     role:"admin"
    // }));

    navigate("/");


  
  }

  return (
    <AuthLayout title="Login">
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
          <p>Don't have an account? 
            <span className=' underline cursor-pointer '
            onClick={()=>navigate("/sign-up")}
            > signup here</span>
          </p>
          
          
        </form>
    </AuthLayout>
  )
}

export default LoginForm;