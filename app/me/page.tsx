"use client"
import { useAppSelector } from '@/source/store/hooks'
import Link from 'next/link'
import { Oval } from 'react-loader-spinner'

export default function Home() {
	const { available, data: userData, tested } = useAppSelector(store => store.user)

	return (
		<main className="flex-1 flex flex-col items-center justify-center gap-5 px-5 py-10 text-sm sm:text-base">
			<div className="flex flex-col items-center justify-center gap-5 text-center">
				{(userData && available && tested) && <p className=''>Welcome {userData?.name} ({userData?.username})</p>}
				{(!available && tested) && <div className="justify-center items-center gap-4 sm:gap-[20px] flex">
					<Link href="/signup" >
						<span className=' font-semibold tracking-wide'>Sign up</span>
					</Link>
					<Link href="/login" >
						<span className=' font-semibold tracking-wide'>Log in</span>
					</Link>
				</div>}
				{!tested && <div className="justify-center items-center gap-4 sm:gap-[20px] flex">
					<Oval color='rgba(111, 0, 255, 0.6)' width={60} secondaryColor='rgba(111, 0, 255, 0.3)' />
				</div>}
			</div>
		</main>
	)
}
