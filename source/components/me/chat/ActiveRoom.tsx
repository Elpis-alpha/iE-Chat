import { waitFor } from "@/source/controllers/SpecialCtrl"
import { useAppDispatch, useAppSelector } from "@/source/store/hooks"
import { setActiveRoomData, setActiveRoomNewDialogue } from "@/source/store/slice/activeRoomSlice"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { FaAngleLeft } from "react-icons/fa"
import RoomNav from "./room/RoomNav"
import { getApiJson, postApiJson } from "@/source/controllers/APICtrl"
import { findOrCreateDialogueURL, findUserByIDURL, getRoomURL } from "@/source/api"
import { useRouter } from "next/navigation"
import EmptyRoom from "./room/EmptyRoom"
import ErrorRoom from "./room/ErrorRoom"
import LoadRoom from "./room/LoadRoom"
import NewRoom from "./room/NewRoom"
import GoodRoom from "./room/GoodRoom"

const ActiveRoom = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const processingRef = useRef({ id: "", type: "" })
	const { available, error, loading, roomID, data: roomData, dialogueUser } = useAppSelector(store => store.activeRoom)
	const { data: userData } = useAppSelector(store => store.user)
	const [roomStatus, setRoomStatus] = useState<"empty" | "loading" | "error" | "new" | "ok">("empty")

	useEffect(() => {
		const workOutStatus = async () => {
			if (error) setRoomStatus("error")
			else if (loading) setRoomStatus("loading")
			else if (!available) { setRoomStatus("empty"); processingRef.current = { id: "", type: "" } }
			else if (available && !roomData && dialogueUser) setRoomStatus("new")
			else if (available && roomData && !dialogueUser) setRoomStatus("ok")
			else if (available && roomData && dialogueUser) setRoomStatus("ok")
			else {
				setRoomStatus("error")
			}
		}
		workOutStatus()
	}, [available, error, loading, roomData, dialogueUser, roomID])

	useEffect(() => {
		const fetchRoomData = async () => {
			if (roomStatus === "loading") {
				// Fetch room data if it is not being fetched
				const { id, type } = processingRef.current
				if (id !== roomID && roomID) {
					processingRef.current.id = roomID

					if (roomID.endsWith("-new")) {
						// Path for a new dialogue
						const serverData = await postApiJson(findOrCreateDialogueURL(), {
							friendID: roomID.replace("-new", ""),
							onlyExist: true
						})

						if (serverData.message === "does-not-exist") {
							return dispatch(setActiveRoomNewDialogue(serverData.data))
						} else if (serverData?.data?.blocked?.status === true) {
							return dispatch(setActiveRoomNewDialogue({ ...serverData.friend, room: serverData.data }))
						} else if (serverData.message === "success") {
							return router.push(`/me/chat?room=${serverData.data._id}`)
						} else return setRoomStatus("error")
					} else {
						// Path for an existing room
						const serverData = await getApiJson(getRoomURL(roomID))

						if (serverData.error) return setRoomStatus("error")
						else if (serverData?.data?.blocked?.status === true) {
							if (serverData?.data?.groupType !== "dialogue") return setRoomStatus("error")

							const _id = serverData?.data?.members?.find?.((gem: { memberID: string }) => gem.memberID !== userData?._id)?.memberID
							if (typeof _id !== "string") return setRoomStatus("error")
							return router.push(`/me/chat?room=${_id}-new`)
						}

						const activeRoomData: activeRoomDataType = {
							type: serverData?.data?.groupType,
							room: serverData.data,
							members: serverData?.members,
						}

						// get messages
						dispatch(setActiveRoomData(activeRoomData))
					}
				}
			}
		}
		fetchRoomData()
	}, [roomStatus, roomID, dispatch, router, userData?._id])

	// empty: Nothing
	// load: Loading a room
	// error: An error room
	// new: Clicked a searched new dialogue
	// ok: A normal room
	return (
		<div className="w-full h-full bg-white rounded-3xl b-hori:vert:rounded-none border-[#59398216] border shadow-sm shadow-[#5939823e] flex flex-col">
			<div className="px-5 py-3 md:px-7 md:py-6 flex-1 flex">
				{/* <div className="w-full h-full" onMouseEnter={() => setRoomStatus("loading")} onMouseLeave={() => setRoomStatus("new")}> */}
				<div className="w-full h-full flex flex-col gap-3">
					{(roomStatus === "ok" || roomStatus === "new" || roomStatus === "loading") && <RoomNav roomStatus={roomStatus} />}
					<div className="flex-1 w-full flex">
						{roomStatus === "empty" && <EmptyRoom />}
						{roomStatus === "error" && <ErrorRoom />}
						{roomStatus === "loading" && <LoadRoom />}
						{roomStatus === "new" && <NewRoom />}
						{roomStatus === "ok" && <GoodRoom />}
					</div>
				</div>
			</div>
			<div className="w-full h-[74px] hidden vert:flex"></div>
		</div>
	)
}
export default ActiveRoom