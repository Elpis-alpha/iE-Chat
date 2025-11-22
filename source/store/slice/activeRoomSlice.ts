import { createSlice } from '@reduxjs/toolkit'

interface ActiveRoomState {
	available: boolean
	loading: boolean
	error: boolean
	roomID?: string
	showMore: boolean
	data?: activeRoomDataType,
	dialogueUser?: {
		_id: string
		name: string
		username: string
		avatar: string
		biography: string
		onlineStatus: {
			isOnline: boolean
			lastOnline: Date
		}
		room?: roomType
		createdAt: Date
		updatedAt: Date
	}
}

const initialState: ActiveRoomState = {
	loading: false,
	available: false,
	error: false,
	data: undefined,
	dialogueUser: undefined,
	roomID: undefined,
	showMore: false,
}

const ActiveRoomSlice = createSlice({
	name: "ActiveRoom",
	initialState,
	reducers: {
		setActiveRoomData: (state, { payload }) => {
			state.data = payload
			state.dialogueUser = undefined
			state.error = false
			state.available = true
			state.loading = false
			state.showMore = false
		},

		setActiveRoomNewDialogue: (state, { payload }) => {
			state.dialogueUser = payload
			state.data = undefined
			state.error = false
			state.available = true
			state.loading = false
			state.showMore = false
		},

		setActiveRoomLoading: (state, { payload }) => {
			state.loading = true
			state.error = false
			state.available = false
			state.data = undefined
			state.dialogueUser = undefined
			state.roomID = payload
			state.showMore = false
		},

		setActiveRoomError: (state) => {
			state.loading = false
			state.error = true
			state.available = false
			state.data = undefined
			state.dialogueUser = undefined
			state.showMore = false
		},

		toggleActiveRoomShowMore: (state) => {
			state.showMore = !state.showMore
		},

		removeActiveRoomData: (state) => {
			state.data = undefined
			state.dialogueUser = undefined
			state.error = false
			state.available = false
			state.loading = false
			state.roomID = undefined
			state.showMore = false
		},
	}
})
export default ActiveRoomSlice.reducer;
export const { setActiveRoomData, removeActiveRoomData, setActiveRoomLoading, setActiveRoomError, setActiveRoomNewDialogue, toggleActiveRoomShowMore } = ActiveRoomSlice.actions