'use client';
import Logo from '@/source/components/Logo'
import { waitFor } from '@/source/controllers/SpecialCtrl';
import Link from 'next/link';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { PiPaperPlaneRightFill } from 'react-icons/pi';
import { Oval } from 'react-loader-spinner';

export default function Home() {
  const [showPassword, setShowPassword] = useState(false)
  const [passwordText, setPasswordText] = useState("")
  const [usernameText, setUsernameText] = useState("")
  const [showLoadUsername, setShowLoadUsername] = useState(false)

  const validateInputPassword = (e: any) => {
    const text = e.target.value as string

    if (text.length < 6) setPasswordText("Your password must have at least 6 characters")
    else if (text.search(/[a-z]/) < 0) setPasswordText("Your password must contain at least one lowercase letter.")
    else if (text.search(/[A-Z]/) < 0) setPasswordText("Your password must contain at least one uppercase letter.")
    else if (text.search(/[0-9]/) < 0) setPasswordText("Your password must contain at least one number.")
    else setPasswordText("")
  }

  const validateInputUsername = async (e: any) => {
    const text = e.target.value as string

    setShowLoadUsername(true)
    setUsernameText("")
    await waitFor(1000)
    setUsernameText("Username is taken, choose another")
    setShowLoadUsername(false)
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-5 px-5 py-10">
      <div className="flex flex-col items-center justify-center gap-8 sm:gap-12 text-center">
        <Link href="/" className='block mx-auto'><Logo className="w-[80%] mx-auto max-w-[550px] md:w-[550px]" /></Link>
        <div className="w-full">
          <div className="w-[200px] h-5 bg-yellow-400 mx-auto"></div>
          <div className="flex items-center justify-center gap-2">
            <span className="flex w-[80px] h-[1px] bg-black"></span> OR <span className="flex w-[80px] h-[1px] bg-black"></span>
          </div>
          <form onSubmit={e => { e.preventDefault() }} className='max-w-[400px] w-full mx-auto text-left'>
            <div className="block pt-8">
              <label htmlFor="name" className='text-black text-xl sm:text-2xl font-medium pb-2 block'>Display Name</label>
              <input required type="text" id='name' name='name' autoComplete='name' placeholder='Enter your Display Name'
                className='px-4 pt-[10px] md:pt-[14px] pb-[12px] md:pb-[16px] bg-blue-50 bg-opacity-90 rounded-2xl border-[#59398226] border shadow-sm shadow-[#5939827e] flex w-full' />
            </div>
            <div className="block pt-8">
              <label htmlFor="username" className='text-black text-xl sm:text-2xl font-medium pb-2 block'>Username</label>
              <div className="block">
                <input required type="text" id='username' name='username' autoComplete='username' placeholder='Enter your Display Username' onBlur={validateInputUsername}
                  className='px-4 pt-[10px] md:pt-[14px] pb-[12px] md:pb-[16px] bg-blue-50 bg-opacity-90 rounded-2xl border-[#59398226] border shadow-sm shadow-[#5939827e] flex w-full' />
                {showLoadUsername && <span className="absolute top-0 right-0 bottom-0 flex items-center justify-center px-4"><Oval color='rgb(111, 0, 255)' width={25} secondaryColor='rgba(111, 0, 255, 0.4)' /></span>}
              </div>
              {usernameText && <small className='absolute top-full left-0 text-[red] text-sm leading-none'>{usernameText}</small>}
            </div>
            <div className="block pt-8">
              <label htmlFor="password" className='text-black text-xl sm:text-2xl font-medium pb-2 block'>Password</label>
              <div className="vlock">
                <input required type={showPassword ? "text" : "password"} id='password' name='password' placeholder='●●●●●●●●●●' autoComplete='current-password'
                  onInput={e => validateInputPassword(e)} onBlur={e => validateInputPassword(e)} onFocus={e => validateInputPassword(e)}
                  className='px-4 pt-[10px] md:pt-[14px] pb-[12px] md:pb-[16px] bg-blue-50 bg-opacity-90 rounded-2xl border-[#59398226] border shadow-sm shadow-[#5939827e] flex w-full pr-9' />
                {showPassword && <button className="absolute top-0 right-0 bottom-0 flex items-center justify-center px-4" onClick={() => setShowPassword(false)}><FaEyeSlash /></button>}
                {!showPassword && <button className="absolute top-0 right-0 bottom-0 flex items-center justify-center px-4" onClick={() => setShowPassword(true)}><FaEye /></button>}
              </div>
              {passwordText && <small className='absolute top-full left-0 text-[red] text-sm leading-none'>{passwordText}</small>}
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
