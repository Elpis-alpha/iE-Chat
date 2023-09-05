"use client"
import Logo from '@/source/components/Logo'
import Link from 'next/link'
import { AiFillMessage } from 'react-icons/ai'
import { SlSettings } from 'react-icons/sl'

export default function Home() {

	return (
		<section className="flex-1 flex p-5 pl-10 text-sm sm:text-base">
			<div className="flex flex-col items-center justify-center w-full gap-5 text-center ">
				<div className="flex flex-col items-center justify-center gap-5 text-center">
					<Logo className="w-[80%] max-w-[300px] md:w-[300px]" />
					<p className=''>Welcome to our chat community!<br />Our platform is all about connecting and learning from each other</p>
					<div className="justify-center items-center gap-4 sm:gap-[20px] flex">
						<Link href="/me/chat" className='justify-center items-center gap-3 inline-flex px-4 sm:px-5 h-14 bg-main-blue text-white rounded-[10px] shake-button'>
							<AiFillMessage className="text-lg" />
							<span className=' font-semibold tracking-wide'>Start Chatting</span>
						</Link>
						<Link href="/me/settings" className='justify-center items-center gap-3 inline-flex px-4 sm:px-5 h-14 rounded-[10px] bg-white text-main-blue border-2 border-main-blue shake-button'>
							<SlSettings className="text-lg" />
							<span className=' font-semibold tracking-wide'>Preferences</span>
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
