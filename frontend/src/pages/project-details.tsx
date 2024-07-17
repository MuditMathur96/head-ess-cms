import React from 'react'
import { useParams } from 'react-router-dom'

type Props = {}
function Sidebar(){
  return (<div>
    Sidebar
  </div>)
}

function Main(){
  return (<div>
    Main
  </div>)
}


function ProjectDetails({}: Props) {
  const {projectId} = useParams();
  return (
    <div className='flex w-full h-full rounded-lg overflow-y-auto'>
      {/*  Sidebar */}
      <div
      className='w-[20%] h-full  border-r p-8'
      ><Sidebar /></div>
      {/* Main */}
      <div className='flex-1 p-8'>
        <Main />
      </div>
    </div>
  )
}

export default ProjectDetails