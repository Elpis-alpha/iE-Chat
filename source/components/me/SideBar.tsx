"use client"
import { useAppSelector } from "@/source/store/hooks"
import LogoutSVG from "./svg/LogoutSVG"
import { toast } from "react-hot-toast"
import { useState } from "react"
import { postApiJson } from "@/source/controllers/APICtrl"
import { logoutUserURL } from "@/source/api"
import Cookies from "universal-cookie"
import { tokenCookieName } from "@/source/__env"
import { useDispatch } from "react-redux"
import { removeUserData, setUserTest } from "@/source/store/slice/userSlice"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { SlHome, SlSettings } from "react-icons/sl"
import { AiOutlineMessage } from "react-icons/ai"

const SideBar = () => {
	const router = useRouter()
	const dispatch = useDispatch()
	const { data: userData, available, tested } = useAppSelector(store => store.user)
	const [processing, setProcessing] = useState(false)
	const path = usePathname()

	const logoutThisUser = async (e: any) => {
		if (processing) return toast("Please wait")
		setProcessing(true)
		const tt = toast.loading("Logging out")

		const logoutData = await postApiJson(logoutUserURL())
		if (logoutData.error) toast.error("An error occured", { id: tt })
		else {
			toast.success("Logged out", { id: tt })

			const cookie = new Cookies()
			cookie.remove(tokenCookieName, { path: '/' })
			dispatch(removeUserData())
			router.push('/')
		}

	}

	if (!tested) {
		return <>
			<aside className="hidden hori:flex 1.5xl:w-28 w-20 self-stretch rounded-3xl bg-main-blue flex-col overflow-hidden">
				<div className="1.5xl:w-16 1.5xl:h-16 w-12 h-12 rounded-full mx-auto mt-7 skeleton">
				</div>
				<div className="pt-12">
					<div className="flex items-center justify-center py-[22px] w-full"><div className="h-[30px] 1.5xl:h-[34px] w-[30px] 1.5xl:w-[34px] skeleton rounded-md"></div></div>
					<div className="flex items-center justify-center py-[22px] w-full"><div className="h-[30px] 1.5xl:h-[34px] w-[30px] 1.5xl:w-[34px] skeleton rounded-md"></div></div>
					<div className="flex items-center justify-center py-[22px] w-full"><div className="h-[30px] 1.5xl:h-[34px] w-[30px] 1.5xl:w-[34px] skeleton rounded-md"></div></div>
				</div>
				<div className="w-full flex-1 items-end justify-center flex pb-7">
					<span className="hidden 1.5xl:block w-[45px] h-[45px] skeleton rounded-lg"></span>
					<span className="block 1.5xl:hidden w-[35px] h-[35px] skeleton rounded-lg"></span>
				</div>
			</aside>
			<nav className="hidden vert:flex w-full py-3 px-4 items-center">
				<div className="w-[50px] h-[50px] rounded-full skeleton shadow-sm shadow-main-blue/20 border border-main-blue/5 ">
				</div>
				<h1 className="font-semibold text-lg pl-3 flex items-center justify-center">
					<span className="inline-block w-20 h-7 skeleton"></span>
				</h1>
				<div className="flex-1 items-center justify-end flex px-[3px]">
					<span className="inline-block w-[29px] h-[30px] skeleton"></span>
				</div>
			</nav>
		</>
	}
	if (!userData || !available) return <></>
	return (
		<>
			<aside className="hidden hori:flex 1.5xl:w-28 w-20 self-stretch rounded-3xl bg-main-blue flex-col overflow-hidden">
				<div className="1.5xl:w-16 1.5xl:h-16 w-12 h-12 rounded-full mx-auto mt-7 skeleton overflow-hidden">
					<img src={userData.avatar} alt={userData.name} />
				</div>
				<div className="pt-12">
					<SideBarIcon href="/me" icon={<SlHome className="1.5xl:text-[32px] text-[28px]" />} active={path === "/me"} />
					<SideBarIcon href="/me/chat" icon={<AiOutlineMessage className="1.5xl:text-[32px] text-[28px]" />} active={path.startsWith("/me/chat")} />
					<SideBarIcon href="/me/settings" icon={<SlSettings className="1.5xl:text-[32px] text-[28px]" />} active={path.startsWith("/me/settings")} />
				</div>
				<div className="w-full flex-1 items-end justify-center flex pb-7">
					<button onClick={logoutThisUser} className="hidden 1.5xl:block shake-button"><LogoutSVG width={45} /></button>
					<button onClick={logoutThisUser} className="block 1.5xl:hidden shake-button"><LogoutSVG width={35} /></button>
				</div>
			</aside>
			<nav className="hidden vert:flex w-full py-3 px-4 items-center">
				<div className="w-[50px] h-[50px] rounded-full skeleton overflow-hidden shadow-sm shadow-main-blue/20 border border-main-blue/5 ">
					<img src={userData.avatar} alt={userData.name} />
				</div>
				<h1 className="font-semibold text-lg pl-3">
					{path === "/me" && "Home"}
					{path.startsWith("/me/chat") && "Chats"}
					{path.startsWith("/me/settings") && "Settings"}
				</h1>
				<div className="flex-1 items-center justify-end flex px-[3px]">
					<button onClick={logoutThisUser} className="shake-button"><LogoutSVG width={29} fill="black" /></button>
				</div>
			</nav>
		</>
	)
}

const SideBarIcon = ({ href, icon, active }: { href: string, icon: React.ReactNode, active: boolean }) => {
	return (
		<Link href={href} className={"flex items-center justify-center py-[22px] w-full text-white hover:bg-black/20 " + (active ? "bg-black/25" : "")}>
			{icon}
			{active && <div className="w-1.5 h-full bg-[#F3B559] absolute top-0 right-0"></div>}
		</Link>
	)
}

export default SideBar