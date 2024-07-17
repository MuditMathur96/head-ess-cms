import Loader from '@/components/loader'


import useGetData from '@/hooks/useGetData'
import ProjectList from '@/components/project/project-list'
import { useAppDispath, useAppSelector } from '@/hooks';
import { useEffect } from 'react';
import { setLoading, setProjects } from '@/store/projectSlice';

type Props = {}
const data = [{
  _id:"01",
  name:"Project 1",
  description:"Some random project"
},
{
  _id:"02",
  name:"Project 2",
  description:"Some random project"
},
{
  _id:"03",
  name:"Project 3",
  description:"Some random project"
},
{
  _id:"04",
  name:"Project 4",
  description:"Some random project"
},
{
  _id:"05",
  name:"Project 5",
  description:"Some random project"
},
{
  _id:"06",
  name:"Project 3",
  description:"Some random project"
}
];





function Dashboard() {
  

    const {error,data,loading} = useGetData("/project");
    const dispatch = useAppDispath();
    const projectState = useAppSelector(state=>state.project);

    useEffect(()=>{
      if(!loading && data){
          dispatch(setProjects(data.projects));
          dispatch(setLoading(loading));
      }
    },[loading])
 
    if(projectState.loading) return <Loader size='lg' />
    if(error) return (
      <div>Error</div>
    )

  return (<div className='w-full h-full'>
    <ProjectList 
    projects={projectState.projects || []}
    />
  </div>);
      
}

export default Dashboard