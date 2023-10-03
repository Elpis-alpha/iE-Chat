"use client"
import Footer from "@/source/components/me/Footer"
import SideBar from "@/source/components/me/SideBar"
import { Oval } from 'react-loader-spinner'
import { useAppSelector } from "@/source/store/hooks"
import NotLoggedIn from "@/source/components/general/NotLoggedIn"
import { useEffect, useState } from "react"

export default function MeLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const [clientLoaded, setClientLoaded] = useState(false)
	const { available, data: userData, tested } = useAppSelector(store => store.user)
	
	useEffect(() => { setClientLoaded(true) }, [])
	if (!clientLoaded) return (
		<main className="flex-1 flex flex-col items-center justify-center gap-5 p-5">
			<Oval color='rgba(111, 0, 255, 0.6)' width={60} secondaryColor='rgba(111, 0, 255, 0.3)' />
		</main>
	)

	return (
		<main className="vert:min-h-[500px] hori:min-h-[550px] text-sm sm:text-base flex-1 flex vert:flex-col hori:flex-row hori:p-8">
			<SideBar />
			{(userData && available && tested) && children}
			{(!available && tested) && <NotLoggedIn />}
			{!tested && <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center p-4">
				<Oval color='rgba(111, 0, 255, 0.6)' width={60} secondaryColor='rgba(111, 0, 255, 0.3)' />
			</div>}
			<Footer />
		</main>
	)
}
