"use client"
import ActiveRoom from "@/source/components/me/chat/ActiveRoom"
import ChatsList from "@/source/components/me/chat/ChatsList"
import { useAppSelector } from "@/source/store/hooks"
import { removeActiveRoomData, setActiveRoomLoading } from "@/source/store/slice/activeRoomSlice"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export default function Home() {
	const dispatch = useDispatch()
	const { available, error, loading, roomID } = useAppSelector(store => store.activeRoom)
	const searchParams = useSearchParams()
	const room = searchParams.get("room")

	useEffect(() => {
		if (room && room !== roomID) dispatch(setActiveRoomLoading(room))
		else if (!room) dispatch(removeActiveRoomData())
	}, [room, roomID, dispatch])


	const isActive = available || error || loading || roomID
	return (
		<>
			<section className="flex-1 flex justify-center hori:gap-[22px] hori:ml-5 text-sm sm:text-base vert:px-4 vert:pb-[2px] overflow-hidden hori:p-[2px]">
				<div className="flex-[3] flex flex-col items-center justify-center w-full hori:h-full z-10 min-w-[270px] b-hori:min-w-[auto]">
					<ChatsList />
				</div>
				<div className={`flex-[5] flex flex-col items-center justify-center w-full h-full z-20 
				b-hori:absolute b-hori:vert:fixed b-hori:top-0 left-anim `+ (isActive ? "b-hori:left-[0]" : "b-hori:left-[105%]")}>
					<ActiveRoom />
				</div>
			</section>
			<div className="w-full h-[12px] hidden vert:flex"></div>
		</>
	)
}
