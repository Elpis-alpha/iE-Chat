import Logo from '@/source/components/Logo'
import Link from 'next/link'
import { FaSignInAlt, FaUsers } from 'react-icons/fa'

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-5 px-5 py-10">
      <div className="flex flex-col items-center justify-center gap-8 sm:gap-12 text-center">
        <Logo className="w-[80%] max-w-[550px] md:w-[550px]" />
        <p className='text-lg sm:text-2xl'>Welcome to our chat community!<br />Our platform is all about connecting and learning from each other</p>
        <div className="justify-center items-center gap-6 sm:gap-[60px] flex max-ssm:flex-col">
          <Link href="/signup" className='justify-center items-center gap-2 sm:gap-5 inline-flex p-5 sm:p-8 bg-main-blue text-white rounded-[21px] '>
            <FaUsers className="w-[50px] sm:h-10 h-8" />
            <span className='text-lg sm:text-2xl font-semibold tracking-wide'>Sign up</span>
          </Link>
          <Link href="/login" className='justify-center items-center gap-2 sm:gap-5 inline-flex px-5 sm:px-8 py-[15px] sm:py-[27px] bg-white text-main-blue border-4 border-main-blue rounded-[21px]'>
            <FaSignInAlt className="sm:w-11 w-9 sm:h-11 h-9" />
            <span className='text-lg sm:text-2xl font-semibold tracking-wide'>Log in</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
