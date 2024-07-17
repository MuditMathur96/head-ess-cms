import React, { ReactNode } from 'react'

type Props = {children:ReactNode,title:string}

function AuthLayout({children,title}: Props) {
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
      className='text-3xl md:text-4xl text-center font-bold mb-8'
      >{title}</h1>
      </div>
      <div
      className='md:w-1/2 
      flex items-center justify-center md:p-4 '
      >

        {children}
      </div>
    </div>
  )
}

export default AuthLayout