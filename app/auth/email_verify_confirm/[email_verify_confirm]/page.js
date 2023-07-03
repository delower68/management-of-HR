"use client"
import Link from 'next/link'
import React from 'react';
import { usePathname } from 'next/navigation';
import useDarkmode from '@/hooks/useDarkMode';

const email_verify_confirm = () => {
    const pathname = usePathname();
    const [isDark] = useDarkmode();
    const email = pathname.split('email_verify_confirm/')[1];
    return (
        <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-4/12 ">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-2xl rounded-lg   border-0">
                        <div className="rounded-t mb-0 px-6 py-6">
                            <div className="text-center">
                                <div className="mobile-logo text-center mb-6  block">

                                    <Link href="/">
                                        <img
                                            src={"/assets/images/logo/email-verify.svg"}
                                            alt=""
                                            className="mx-auto"
                                        />
                                    </Link>
                                </div>
                                <h6 className=" text-black text-md font-bold">
                                    <span className='text-black'>{email}</span> has been verified.
                                </h6>
                            </div>
                            <div className="btn btn-dark text-center text-white  text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 mt-4">
                                <Link href='/auth/login' >
                                    Log In
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default email_verify_confirm