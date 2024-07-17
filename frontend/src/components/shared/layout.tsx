import React, { ReactNode } from 'react'

type Props = {
  children:ReactNode
}

function Layout({children}: Props) {
  return (
    <div className='h-screen w-screen bg-slate-50 
    p-4 md:px-16 md:py-12  xl:p-14 xl:px-32'>
        <div className='bg-white h-full w-full 
        flex items-center justify-center
        rounded-xl shadow-sm border'>
            {children}
        </div>
    </div>
  )
}

export default Layout