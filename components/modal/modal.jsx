import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const Modal = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;
    return (
        <div className='fixed inset-0 bg-black-800 bg-opacity-50 backdrop-blur-sm flex justify-center items-center '
        >
            <div className='w-[600px] flex flex-col bg-white bg-opacity-75  shadow-lg rounded'>
                <button
                    className=''
                    onClick={() => onClose()}>
                    <p className='text-blue-700 text-2xl float-right m-2 '><AiOutlineCloseCircle /></p>
                </button>
                <div className=' p-6' >{children}
                </div>
            </div>
        </div>
    )
}

export default Modal