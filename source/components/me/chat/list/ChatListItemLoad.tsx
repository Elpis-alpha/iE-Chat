import { formatChatsTime, parseAdminMessage } from "@/source/controllers/helpers"

type Props = {
	lastItem: boolean
}
const ChatListItemLoad = ({ lastItem }: Props) => {

	return (
		<div className="flex gap-4 items-center pb-3">
			<div className="">
				<div className="w-12 h-12 rounded-full skeleton" />
			</div>
			<div className="flex-1 flex flex-col justify-center items-start gap-2">
				<h4 className="text-base font-medium skeleton text-transparent w-[55%] h-5 rounded-xl"></h4>
				<p className="text-sm font-light skeleton text-transparent w-[98%] h-4 rounded-xl"></p>
			</div>
			<div className="text-xs font-light flex items-end flex-col gap-1">
				<time className="skeleton text-transparent w-[45px] rounded-xl select-none">a</time>
				<div className={"w-5 h-5 rounded-full flex items-center justify-center font-normal text-[10px] leading-5 opacity-0"}></div>
			</div>
			{!lastItem && <div className="absolute bottom-0 left-0 right-0 w-full h-[1px] skeleton"></div>}
		</div>
	)
}
export default ChatListItemLoad