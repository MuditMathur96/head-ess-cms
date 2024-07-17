type CardProps={
    title:string,
    description?:string,
    updatedAt?:string
}

function Card ({title,description,updatedAt}:CardProps){
  
    return (<div className='bg-white w-full h-full border rounded-lg
    flex flex-col gap-4
    p-4
    '>
      {/* title */}
      <h3
      className='font-medium text-lg'
      >{title}</h3>
  
      {/* description */}
      <p>{description}</p>
      {/* footer */}
      <hr />
      <p>{updatedAt?updatedAt:Date.now()}</p>
    </div>)
  
}

export default Card;