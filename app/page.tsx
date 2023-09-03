import Logo from '@/source/components/Logo'
import Link from 'next/link'
import { FaSignInAlt, FaUsers } from 'react-icons/fa'

export default function Home() {

  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-5 px-5 py-10 text-sm sm:text-base">
      <div className="flex flex-col items-center justify-center gap-5 text-center">
        <Logo className="w-[80%] max-w-[300px] md:w-[300px]" />
        <p className=''>Welcome to our chat community!<br />Our platform is all about connecting and learning from each other</p>
        <div className="justify-center items-center gap-4 sm:gap-[20px] flex">
          <Link href="/signup" className='justify-center items-center gap-3 inline-flex px-4 sm:px-5 h-14 bg-main-blue text-white rounded-[10px] shake-button'>
            <FaUsers className="text-lg" />
            <span className=' font-semibold tracking-wide'>Sign up</span>
          </Link>
          <Link href="/login" className='justify-center items-center gap-3 inline-flex px-4 sm:px-5 h-14 rounded-[10px] bg-white text-main-blue border-2 border-main-blue shake-button'>
            <FaSignInAlt className="text-lg" />
            <span className=' font-semibold tracking-wide'>Log in</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
