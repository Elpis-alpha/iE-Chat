"use client"
import { SlHome, SlSettings } from "react-icons/sl"
import { AiOutlineMessage } from "react-icons/ai"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useAppSelector } from "@/source/store/hooks"

const Footer = () => {
	const path = usePathname()
	const { available, tested } = useAppSelector(store => store.user)
	if (!tested) {
		return <>
			<div className="w-full h-[74px] hidden vert:flex"></div>
			<footer className="hidden vert:flex fixed bottom-0 left-0 right-0 bg-light-blue z-30 w-full pt-5 pb-[22px] px-5 items-center justify-between border-t border-black/20 rounded-3xl gap-12">
				<div className="flex items-center justify-center w-full"><div className="shake-button w-7 h-7 skeleton"></div></div>
				<div className="flex items-center justify-center w-full"><div className="shake-button w-7 h-7 skeleton"></div></div>
				<div className="flex items-center justify-center w-full"><div className="shake-button w-7 h-7 skeleton"></div></div>
			</footer>
		</>
	}

	if (!available) return <></>
	return (
		<>
			<div className="w-full h-[74px] hidden vert:flex"></div>
			<footer className="hidden vert:flex fixed bottom-0 left-0 right-0 bg-light-blue z-30 w-full pt-5 pb-[22px] px-5 items-center justify-between border-t border-black/20 rounded-t-3xl gap-12">
				<SideBarIcon href="/me" icon={<SlHome size={28} />} active={path === "/me"} />
				<SideBarIcon href="/me/chat" icon={<AiOutlineMessage size={29} />} active={path.startsWith("/me/chat")} />
				<SideBarIcon href="/me/settings" icon={<SlSettings size={28} />} active={path.startsWith("/me/settings")} />
			</footer>
		</>
	)
}

const SideBarIcon = ({ href, icon, active }: { href: string, icon: React.ReactNode, active: boolean }) => {
	return (
		<div className="flex items-center justify-center w-full">
			<Link href={href} className={"flex items-center justify-center text-black shake-button " + (active ? "text-main-blue" : "")}>
				{icon}
			</Link>
		</div>
	)
}

export default Footer