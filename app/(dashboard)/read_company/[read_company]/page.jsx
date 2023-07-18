'use client'
import Loading from '@/app/loading';
import moment from 'moment';
import Link from 'next/link';
import React from 'react'
import { BiSolidEdit } from 'react-icons/bi';

const CompanyDetails = ({ company, loading }) => {
  console.log({ company })
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {/* <div className="profiel-wrap px-[35px] mt-10 pb-10 md:pt-[84px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]">
          <div className="bg-slate-900 dark:bg-slate-700 absolute left-0 top-10 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg"></div>
          <div className="profile-box flex-none md:text-start text-center">
            <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
              <div className="flex-none">
                <div className="md:h-[100px] md:w-[100px] h-[80px] w-[80px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
                  <img
                    src="/assets/images/users/user-1.jpg"
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]">
                  Albert Flores
                </div>
                <div className="text-sm font-light text-slate-600 dark:text-slate-400">
                  Front End Developer
                </div>
              </div>
            </div>
          </div>

        </div> */}
      <div className='flex justify-center  items-center   '>
        <p className='text-lg text-black-700'>Company Information</p>
        <div className='flex text-sm  items-center ml-2'>
          <p> <BiSolidEdit /></p>
          <p>edit</p>
        </div>
      </div>
      {/* <div>
        <div className="grid grid-cols-3 gap-7 pt-8 m-3">
          <p>Legal Name: {company.legal_name}</p>
          <p>Company Type: {company.company_type}</p>
        </div>
      </div> */}
      <div className='flex justify-center items-center mt-10'>
        <div className='mr-10'>
          <p className='mb-3'>Company Type: </p>
          <p className='mb-3'>Legal name: </p>
          <p className='mb-3'>Trading name: </p>
          <p className='mb-3'>Other license number:</p>
          <p className='mb-3'>Created Date: </p>
        </div>
        <div>
          <p className='mb-3'>{company.company_type}</p>
          <p className='mb-3'>{company.legal_name}</p>
          <p className='mb-3'>{company.trading_name}</p>
          {company.other_licese_number ? 
          <p className='mb-3'>{company?.other_licese_number}</p> :
          <p className='mb-3'>null</p>
          }
          <p className="mb-3">{moment(company?.createdAt).format('DD-MM-YYYY')}</p>
        </div>
      </div>
    </>
  )
}

export default CompanyDetails;