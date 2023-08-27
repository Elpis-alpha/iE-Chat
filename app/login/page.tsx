'use client';
import Logo from '@/source/components/Logo'
import Link from 'next/link';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { PiPaperPlaneRightFill } from 'react-icons/pi';

export default function Home() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-5 px-5 py-10">
      <div className="flex flex-col items-center justify-center gap-8 sm:gap-12 text-center">
        <Link href="/"><Logo className="w-[80%] max-w-[550px] md:w-[550px]" /></Link>
        <div className="w-full">
          <div className="w-[200px] h-5 bg-yellow-400 mx-auto"></div>
          <div className="flex items-center justify-center gap-2">
            <span className="flex w-[80px] h-[1px] bg-black"></span> OR <span className="flex w-[80px] h-[1px] bg-black"></span>
          </div>
          <form onSubmit={e => { e.preventDefault() }} className='max-w-[400px] w-full mx-auto text-left'>
            <div className="block pt-8">
              <label htmlFor="username" className='text-black text-xl sm:text-2xl font-medium pb-2 block'>Username</label>
              <div className="block">
                <input required type="text" id='username' name='username' autoComplete='username' placeholder='Enter your Display Username'
                  className='px-4 pt-[10px] md:pt-[14px] pb-[12px] md:pb-[16px] bg-blue-50 bg-opacity-90 rounded-2xl border-[#59398226] border shadow-sm shadow-[#5939827e] flex w-full' />
              </div>
            </div>
            <div className="block pt-8">
              <label htmlFor="password" className='text-black text-xl sm:text-2xl font-medium pb-2 block'>Password</label>
              <div className="vlock">
                <input required type={showPassword ? "text" : "password"} id='password' name='password' placeholder='●●●●●●●●●●' autoComplete='current-password'
                  className='px-4 pt-[10px] md:pt-[14px] pb-[12px] md:pb-[16px] bg-blue-50 bg-opacity-90 rounded-2xl border-[#59398226] border shadow-sm shadow-[#5939827e] flex w-full pr-9' />
                {showPassword && <button className="absolute top-0 right-0 bottom-0 flex items-center justify-center px-4" onClick={() => setShowPassword(false)}><FaEyeSlash /></button>}
                {!showPassword && <button className="absolute top-0 right-0 bottom-0 flex items-center justify-center px-4" onClick={() => setShowPassword(true)}><FaEye /></button>}
              </div>
            </div>
            <div className="pt-8">
              <button className='justify-center items-center gap-4 inline-flex px-9 py-4 bg-main-blue text-white rounded-[21px] '>
                <span className='text-lg font-semibold tracking-wide'>Submit</span>
                <PiPaperPlaneRightFill className="w-[25px]" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
