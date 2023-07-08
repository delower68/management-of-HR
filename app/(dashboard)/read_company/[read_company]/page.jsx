'use client'
import React from 'react'
import { BiSolidEdit } from 'react-icons/bi';

const companyDetails = () => {
  return (
    <div className='flex justify-left items-center'>
      <p className='text-lg'
      >Company Information</p>
      <div className='flex text-sm  items-center ml-2'>
      <p> <BiSolidEdit/></p>
      <p>edit</p>
      </div>
    </div>
  )
}

export default companyDetails ;