import { waitFor } from "@/source/controllers/SpecialCtrl"
import { useAppDispatch, useAppSelector } from "@/source/store/hooks"
import { setActiveRoomData, setActiveRoomNewDialogue } from "@/source/store/slice/activeRoomSlice"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const ActiveRoom = () => {
	const dispatch = useAppDispatch()
	const processingRef = useRef({ id: "", type: "" })
	const { available, error, loading, roomID, data: roomData, dialogueUser } = useAppSelector(store => store.activeRoom)
	const [roomStatus, setRoomStatus] = useState<"empty" | "loading" | "error" | "new" | "ok">("empty")

	useEffect(() => {
		const workOutStatus = async () => {
			if (error) setRoomStatus("error")
			else if (loading) setRoomStatus("loading")
			else if (!available) setRoomStatus("empty")
			else if (available && !roomData && dialogueUser) setRoomStatus("new")
			else if (available && roomData && !dialogueUser) setRoomStatus("ok")
			else if (available && roomData && dialogueUser) setRoomStatus("ok")
			else setRoomStatus("error")
		}
		workOutStatus()
	}, [available, error, loading, roomData, dialogueUser])

	useEffect(() => {
		const fetchRoomData = async () => {
			if (roomStatus === "loading") {
				// Fetch room data if it is not being fetched
				const { id, type } = processingRef.current
				if (id !== roomID && roomID) {
					processingRef.current.id = roomID

					await waitFor(1300)
					console.log("Fetching")
					if (!roomID.endsWith("-new")) {
						// Path for a new dialogue
						
						dispatch(setActiveRoomData({ isGroup: true }))
					} else {
						// Path for an existing room
						dispatch(setActiveRoomNewDialogue({ isGroup: true }))
					}
				}
			}
		}
		fetchRoomData()
	}, [roomStatus, roomID, dispatch])

	// empty: Nothing
	// load: Loading a room
	// error: An error room
	// new: Clicked a searched new dialogue
	// ok: A normal room
	return (
		<div className="w-full h-full bg-white rounded-3xl b-hori:rounded-none border-[#59398216] border shadow-sm shadow-[#5939823e]">

			<Link href={"/me/chat"}>Back</Link>
			<div className="">roomID: {roomID ?? "Null"}</div>
			<div className="">Status: {roomStatus}</div>
			{roomStatus === "ok" && <button onClick={() => dispatch(setActiveRoomData({ isGroup: false }))}>Click me</button>}
			{JSON.stringify(roomData)}
			<div className="w-full h-[74px] hidden vert:flex"></div>
		</div>
	)
}
export default ActiveRoom