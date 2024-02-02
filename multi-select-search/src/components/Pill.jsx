import React from 'react'
import { random } from 'superheroes'

function Pill({image,text,onClick,color}) {
  
  const randomColors = ['green','yellow','blue','pink','purple','gray']
  

  return (
    <div onClick={onClick} className={`flex justify-center cursor-pointer items-center bg-black h-[40px] p-2  rounded-full `}>
        <img className='w-[30px] h-[30px] rounded-full ' src={image} alt="pill-img" />
        <p className='font-semibold text-white text-sm'>{text}</p>
        <p className='text-white ml-2 font-semibold text-sm '>X</p>
    </div>
  )
}

export default Pill