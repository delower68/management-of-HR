import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const Modal = ({isVisible, onClose,children}) => {
    if(!isVisible)  return null ;
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center ' 
    >
        <div className='w-[600px] flex flex-col  shadow-lg'>
            <button 
            className=''
            onClick={()=> onClose()}>
                <p className='text-blue-700 text-xl float-right '><AiOutlineCloseCircle/></p>
            </button>
    <div className=' p-6' >{children}
    </div>
        </div>
    </div>
  )
}

export default Modal