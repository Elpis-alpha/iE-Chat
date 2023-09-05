import Link from "next/link"
import { TbFaceIdError } from "react-icons/tb"

const NotLoggedIn = () => {
	return (
		<div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
			<div className=""><TbFaceIdError className="w-20 h-20 text-main-blue" /></div>
			<h2 className="text-base sm:text-lg font-semibold">You are not logged in</h2>
			<div className="justify-center items-center gap-3 flex">
				<Link href="/" className="hover:underline">
					<span className=' font-medium tracking-wide'>Home</span>
				</Link>
				<span className="w-2 h-2 rounded-full bg-main-blue"></span>
				<Link href="/signup" className="hover:underline">
					<span className=' font-medium tracking-wide'>Sign up</span>
				</Link>
				<span className="w-2 h-2 rounded-full bg-main-blue"></span>
				<Link href="/login" className="hover:underline">
					<span className=' font-medium tracking-wide'>Log in</span>
				</Link>
			</div>
		</div>
	)
}
export default NotLoggedIn