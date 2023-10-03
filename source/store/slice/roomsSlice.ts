import { createSlice } from '@reduxjs/toolkit'

interface RoomsState {
	available: boolean
	data: roomListItemDataType[]
	tested: boolean
	loading: boolean
	refetchRooms: boolean
}

const initialState: RoomsState = {
	available: false,
	data: [],
	tested: false,
	loading: false,
	// This is used to determine whether or not the rooms data should be refetched in the FetchAppData Component
	// It is set to true in the login and sign up pages so that the rooms will be refetched 
	refetchRooms: false
}

const roomsSlice = createSlice({
	name: "Rooms",
	initialState,
	reducers: {
		setRoomsData: (state, { payload }: { payload: roomListItemDataType[] }) => {
			state.data = payload
			state.tested = true
			state.available = true
			state.loading = false
		},

		setRoomsTest: (state, { payload }) => {
			state.tested = payload
			state.loading = false
		},

		setRoomsLoading: (state, { payload }) => {
			state.loading = payload
		},

		removeRoomsData: (state) => {
			state.data = []
			state.available = false
			state.loading = false
			state.tested = true
		},

		setRefetchRooms: (state, { payload }) => {
      state.refetchRooms = payload
    },
	}
})

export default roomsSlice.reducer;
export const { setRoomsData, setRoomsTest, removeRoomsData, setRoomsLoading, setRefetchRooms } = roomsSlice.actions