import { createSlice } from '@reduxjs/toolkit'

interface ActiveRoomState {
	available: boolean
	loading: boolean
	error: boolean
	roomID?: string
	data?: {
		type: "group" | "dialogue" | "new-dialogue"
		room?: {
			_id: string
			recent: {
				message: string
				date: Date
			},
			blocked: {
				status: boolean
				by: string
			},
			members: {
				memberID: string
				isAdmin: boolean
				joinedOn: string
				unread: number,
				muted: boolean,
				pinned: boolean,
				_id: string
			}[]
			groupType: "dialogue" | "group"
			createdAt: Date
			updatedAt: Date
		}
		user?: {
			_id: string
			name: string
			username: string
			avatar: string
			createdAt: Date
		}
		messages?: {
			data: {
				_id: string
				sender?: string
				reference?: string
				room: string
				messageType: "text" | "image"
				text?: string
				image?: string
				adminMessage: boolean
				seenBy: { id: string }[]
				deleted: boolean
				createdAt: Date
				updatedAt: Date
			}[]
			more: boolean
		}
	},
	dialogueUser?: {
		isGroup: boolean
	}
}

const initialState: ActiveRoomState = {
	loading: false,
	available: false,
	error: false,
	data: undefined,
	dialogueUser: undefined,
	roomID: undefined,
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
		},

		setActiveRoomNewDialogue: (state, { payload }) => {
			state.dialogueUser = payload
			state.data = undefined
			state.error = false
			state.available = true
			state.loading = false
		},

		setActiveRoomLoading: (state, { payload }) => {
			state.loading = true
			state.error = false
			state.available = false
			state.data = undefined
			state.dialogueUser = undefined
			state.roomID = payload
		},

		setActiveRoomError: (state) => {
			state.loading = false
			state.error = true
			state.available = false
			state.data = undefined
			state.dialogueUser = undefined
		},

		removeActiveRoomData: (state) => {
			state.data = undefined
			state.dialogueUser = undefined
			state.error = false
			state.available = false
			state.loading = false
			state.roomID = undefined
		},
	}
})
export default ActiveRoomSlice.reducer;
export const { setActiveRoomData, removeActiveRoomData, setActiveRoomLoading, setActiveRoomError, setActiveRoomNewDialogue } = ActiveRoomSlice.actions