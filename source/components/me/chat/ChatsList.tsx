"use client"
import { useAppSelector } from "@/source/store/hooks"
import { FiSearch } from "react-icons/fi"
import { formatChatsTime, parseAdminMessage } from "@/source/controllers/helpers"
import Link from "next/link"
import { useRef, useState } from "react"
import ChatListItem from "./list/ChatListItem"
import { getApiJson } from "@/source/controllers/APICtrl"
import { filterUsersURL } from "@/source/api"
import SearchListItem from "./list/SearchListItem"
import { v4 } from "uuid"
import { waitFor } from "@/source/controllers/SpecialCtrl"
import ChatListItemLoad from "./list/ChatListItemLoad"
import SearchListItemLoad from "./list/SearchListItemLoad"
import { FaTimesCircle } from "react-icons/fa"

const ChatsList = () => {
	const { available: roomsAvailable, data: roomsData, loading: roomsLoading, tested } = useAppSelector(store => store.rooms)
	const trackSearch = useRef("")
	const [searchText, setSearchText] = useState("")
	const [search, setSearch] = useState({
		isActive: false,
		query: "",
		loading: false,
		error: false,
		results: [] as { _id: string, name: string, biography: string, username: string, avatar: string }[]
	})

	const searchUsers = async (text: string) => {
		setSearchText(text)
		text = text.trim()
		const myTrack = v4()

		if (text.length <= 0) return setSearch(prev => ({ ...prev, isActive: false }))

		// Start searching
		setSearch(prev => ({ ...prev, isActive: true, error: false, loading: true, query: text, results: [] }))
		trackSearch.current = myTrack

		await waitFor(350)
		if (myTrack !== trackSearch.current) return false

		const searchData = await getApiJson(filterUsersURL(text, 20, 0))
		if (myTrack !== trackSearch.current) return false

		if (searchData.error) setSearch(prev => ({ ...prev, isActive: true, error: true, loading: false }))
		else setSearch(prev => ({ ...prev, isActive: true, error: false, loading: false, results: searchData.data }))
	}

	const deactivateSearch = () => {
		setSearch(prev => ({ ...prev, isActive: false }))
		setSearchText("")
	}

	if (!roomsAvailable || !roomsData) return <div>Loading</div>
	return (
		<div className="flex flex-col w-full h-full vert:gap-4 hori:gap-[22px]">
			<div className="w-full">
				<input type={"text"} placeholder='Search' onInput={(e: any) => searchUsers(e.target.value)} value={searchText}
					className='pr-3 pl-12 pt-3.5 pb-3 bg-blue-50 bg-opacity-90 rounded-3xl border-[#59398216] border shadow-sm shadow-[#5939823e] flex w-full bg-white' />
				<button type='button' className="absolute top-0 left-0 bottom-0 flex items-center justify-center px-4 text-[#7C7C7C] text-lg sm:text-xl"><FiSearch /></button>
				{search.isActive && <button onClick={deactivateSearch} type='button' className="absolute top-0 right-0 bottom-0 flex items-center justify-center px-4 text-[red] text-lg sm:text-xl"><FaTimesCircle /></button>}
			</div>
			<div className="w-full flex-1 bg-white rounded-3xl border-[#59398216] border shadow-sm shadow-[#5939823e] overflow-hidden">
				<div className="hori:absolute top-0 left-0 right-0 bottom-0 w-full h-full overflow-auto p-4 flex flex-col">
					<h2 className="vert:hidden hori:block text-2xl font-semibold pb-4 text-[#303030] line-clamp-1 shrink-0">
						{search.isActive ? `Results` : "Chats"}
					</h2>
					{!search.isActive && <div className="flex flex-col gap-4 flex-1">
						{(!roomsLoading) && roomsData.map((room, i) => <ChatListItem key={room.groupID} room={room} lastItem={!(i + 1 < roomsData.length)} />)}

						{(!roomsLoading && roomsData.length <= 0) && <div>No Chats Here!</div>}

						{(!roomsLoading && !roomsAvailable) && <div>An Error Occured</div>}

						{roomsLoading && <div className="flex flex-col gap-4 flex-1 absolute top-0 left-0 right-0 bottom-0 w-full h-full overflow-hidden">
							{Array(5).fill("ll-loader").map((id, i, x) => <ChatListItemLoad key={id + i} lastItem={!(i + 1 < x.length)} />)}
						</div>}
					</div>}
					{search.isActive && <div className="flex flex-col gap-4 flex-1">
						{search.results.map((user, i) => <SearchListItem key={user._id} user={user} lastItem={!(i + 1 < search.results.length)} />)}
						{search.error && <div>An Error Occured</div>}
						{search.loading && <div className="flex flex-col gap-4 flex-1 absolute top-0 left-0 right-0 bottom-0 w-full h-full overflow-hidden">
							{Array(5).fill("ll-loader").map((id, i, x) => <SearchListItemLoad key={id + i} lastItem={!(i + 1 < x.length)} />)}
						</div>}
						{((!search.error && !search.loading) && search.results.length <= 0) && "No Results"}
					</div>}
				</div>
			</div>
		</div>
	)
}
export default ChatsList