import { ZodIssue } from "zod";

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

export default Errors;