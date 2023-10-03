import { formatChatsTime, parseAdminMessage } from "@/source/controllers/helpers"
import { useAppSelector } from "@/source/store/hooks"
import Link from "next/link"

type Props = {
	room: roomListItemDataType
	lastItem: boolean
}
const ChatListItem = ({ room, lastItem }: Props) => {
	const { data: userData } = useAppSelector(store => store.user)

	return (
		<Link href={`/me/chat?room=${room.groupID}`} className="flex gap-4 items-center pb-3">
			<div className="">
				<img src={room.image} alt={room.name} className="w-12 h-12 rounded-full" />
			</div>
			<div className="flex-1">
				<h4 className="text-base font-medium line-clamp-1">{room.name}</h4>
				<p className="text-sm font-light line-clamp-1">{room.message.adminMessage ? parseAdminMessage(room.message.text ?? "", [
					{ id: userData?._id ?? "", name: "You" },
					{ id: room.friend?._id ?? "", name: room.friend?.username ?? "" },
				]) : room.message.text}</p>
			</div>
			<div className="text-xs font-light flex items-end flex-col gap-1">
				<time className="">{formatChatsTime(room.recent.date)}</time>
				<div className={"w-5 h-5 rounded-full text-white flex items-center justify-center font-normal text-[10px] leading-5 " +
					(room.profile.muted ? "bg-[#646464]" : "bg-[#F24E1E]") + (room.profile.unread > 0 ? "opacity-100" : "opacity-0 select-none")}>
					{room.profile.unread}
				</div>
			</div>
			{!lastItem && <div className="absolute bottom-0 left-0 right-0 w-full h-[1px] bg-[#b4abab60]"></div>}
		</Link>
	)
}
export default ChatListItem