import React, { useState } from 'react'
import {z} from 'zod';
import Input from '../input';
import { File, Folder } from 'lucide-react';
import useFormHook from '@/hooks/useFormHook';
import { Button } from '../ui/button';
import Errors from '../form-errors';
import { createProject } from '@/api/project.api';
import { useNavigate } from 'react-router-dom';

type Props = {}

const schema= z.object({
  name:z.string({
    message:"project name is required"
  }).min(5,{
    message:"project name must be atleast 5 characters long"
  }),
  description:z.string().optional(),

})

const DEFAULT_STATE ={
  name:"",
  description:""
}


function CreateProjectForm() {

  const [formData,setFormData] = useState<z.infer<typeof schema>>(DEFAULT_STATE);
  const {verify,errors} = useFormHook({schema});
  const navigate =useNavigate();

  const handleChange =(key:string,value:string)=>{
    
    setFormData((prev)=>({
      ...prev,
      [key]:value
    }))

  }

  const handleSubmit=async(e:React.FormEvent)=>{
      e.preventDefault();
      const isValid =  verify(formData);
      if(!isValid) return;

      const newProject = await createProject(formData.name);
      navigate("/"+newProject.project._id);



  }


  return (
    <div className='w-full  md:w-3/4 lg:w-1/2 '>
      <form 
      className='flex flex-col gap-4'>
        <Input 
        placeholder='Enter project name'
        icon={Folder}
        value={formData.name}
        onChange={(e)=>handleChange("name",e.target.value)}
        required={true}
        type="text"
        name="name"


        />
         <Input 
         type="text"
        name="name"
        placeholder='Enter a short description'
        icon={File}
        value={formData.description}
        onChange={(e)=>handleChange("description",e.target.value)}


        />
        {errors.length>0 && <Errors errors={errors} />}
        <Button onClick={handleSubmit}>Submit</Button>
      </form>
    </div>
  )
}

export default CreateProjectForm