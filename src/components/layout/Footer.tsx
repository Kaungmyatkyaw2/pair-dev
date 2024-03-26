import Link from 'next/link'
import React from 'react'

export const Footer = () => {
    return (
        <div className='border-t py-[20px] lg:px-28 px-5 flex justify-between items-center md:!flex-row !flex-col md:space-y-0 space-y-[15px]'>
            <Link href={"/"} className='flex-1'>
                <h1 className='text-xl font-bold'>Pair Dev.</h1>
            </Link>
            <p className='text-sm text-gray-500 flex-2 text-center'>&copy; {new Date().getFullYear()} Pair Dev. All rights reserved.</p>
            <p className='text-sm flex-1 text-end'>This app is createdy by <a className='underline' href="https://github.com/Kaungmyatkyaw2">Kaung Myat Kyaw</a></p>
        </div>
    )
}