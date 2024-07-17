import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../card'
import { Button } from '../ui/button'

type Props = {
    projects:any[]
}

const ProjectList = ({projects}: Props) => {

    const navigate = useNavigate();

    function handleClick(e:React.MouseEvent<HTMLDivElement>){
        const target = e.target as HTMLElement;
        const projectId = target.closest('[data-id]')?.getAttribute('data-id');
        if(projectId){
          navigate("/"+projectId);
        }
      }
    function navigateToCreate(){

        navigate("/project/create");
    }

    


  return (  <div className='w-full h-full  rounded-lg 
    p-4 lg:p-8
    flex flex-col gap-4
    '>
      <div className='flex justify-between items-center'>
        <h1
        className='text-lg md:text-2xl font-semibold'
        >Your Projects</h1>
  
        <Button onClick={navigateToCreate}>Create New Project</Button>
  
      </div>
      <hr />
      {/* Create a new project */}
      {projects.length === 0 && <div className='flex-1 '>
        <h4 
        
        className='text-center text-lg md:text-xl my-4'>
            Looks like you have not created any project
        </h4>
        <div className='flex justify-center'>
        <Button onClick={navigateToCreate}>Create New Project</Button>
        </div>
        </div>}
  
      {/* Project List */}
      {projects.length>0 && <div className='flex-1 min-h-1 overflow-y-auto
       grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
       justify-items-start
       md:gap-8
       '
       onClick={handleClick}
       >
        {projects.map((p)=>{
          return <div
          className='w-full max-h-[250px] h-full'
          key={p._id}
          data-id={p._id}
          >
            <Card
            title={p.name}
            description={p.description} />
            </div>
        })}
      </div>}
  
  
  
  
    </div>) 


}

export default ProjectList