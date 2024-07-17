import { Button } from '@/components/ui/button'
import useFormHook from '@/hooks/useFormHook';
import { Lock,UserRound } from 'lucide-react'
import { login } from '@/store/authSlice';
import {signup as signupApi} from '@/api/auth.api';

import Input from '@/components/input';
import Errors from '@/components/form-errors';

import {z} from 'zod';
import { useState } from 'react';
import { useAppDispath } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './shared/auth-layout';


const LoginFormType= z.object({
  email:z.string().email({message:"Invalid email"}),
  password:z.string().min(8,{
    message:"Password must be atleast 8 characters long"
  }).max(32,{
    message:"Password must be less than 32 characters"
  }),
  confirmPassword:z.string({message:"Confirm password is required"}).min(8,{
    message:"Confirm password must be atleast 8 characters long"
  }).max(32,{
    message:"Confirm password must be less than 32 characters"
  }),
}).superRefine(({password,confirmPassword},ctx)=>{
    if(password !== confirmPassword){
        ctx.addIssue({
            code:"custom",
            message:"Password and Confirm password must match"
        })
    }
});
const DEFAULTSTATE ={
  email:"",
  password:"",
  confirmPassword:""
}

function SignUpForm() {

  const [formData,setFormData] = useState<z.infer<typeof LoginFormType>>(DEFAULTSTATE);
  const {verify,errors} = useFormHook({schema:LoginFormType});
  const dispatch =  useAppDispath();

  const navigate = useNavigate();


  const handleInputChange = (key:keyof typeof formData,value:any)=>{
    setFormData(prev=>({...prev,[key]:value}));

    
  }
  const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault();
    const isValid = verify(formData);
    if(!isValid) return;  
    await signupApi(formData.email,formData.password);
    
    navigate("/login");


  
  }

  return (
    <AuthLayout title="Sign Up">
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
            <Input
          type="text"
          name="confirm-password"
          value={formData.confirmPassword}
          onChange={(e)=>{handleInputChange("confirmPassword",e.target.value)}}
          placeholder='Enter confirm password'
          icon={Lock}
          required

          />
          {errors?.length?<Errors errors={errors}/>:null}
          <Button 
          className='w-full' 
          onClick={handleSubmit}>Submit</Button>
          <p>Already have an account?  
             <span className=' underline cursor-pointer '
            onClick={()=>navigate("/login")}
            >click here</span>
          </p>
          
          
        </form>
    </AuthLayout>
  )
}

export default SignUpForm;