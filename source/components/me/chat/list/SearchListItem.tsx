import Link from "next/link"

type Props = {
	user: { _id: string, name: string, biography: string, username: string, avatar: string }
	lastItem: boolean
}
const SearchListItem = ({ user, lastItem }: Props) => {
	return (
		<Link href={`/me/chat?room=${user._id}-new`} className="flex gap-4 items-center pb-3" title={user.biography}>
			<div className="">
				<img src={user.avatar} alt={user.username} className="w-12 h-12 rounded-full" />
			</div>
			<div className="flex-1">
				<h4 className="text-base font-medium line-clamp-1">{user.name}</h4>
				<p className="text-sm font-light line-clamp-1">{user.username}</p>
			</div>
			{!lastItem && <div className="absolute bottom-0 left-0 right-0 w-full h-[1px] bg-[#b4abab60]"></div>}
		</Link>
	)
}
export default SearchListItem