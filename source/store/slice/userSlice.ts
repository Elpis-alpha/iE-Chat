import { createSlice } from '@reduxjs/toolkit'

interface UserState {
	available: boolean
	data?: {
		_id?: string
		username?: string
		displayName?: string
		bio?: string
		avatar?: string
	}
	tested: boolean
	loading: boolean
}

const initialState: UserState = {
	available: false,
	data: {},
	tested: false,
	loading: false
}

const UserSlice = createSlice({
	name: "User",
	initialState,
	reducers: {
		setUserData: (state, { payload }) => {
			state.data = payload
			state.tested = true
			state.available = true
			state.loading = false
		},
		
		setUserTest: (state, { payload }) => {
			state.tested = payload
			state.loading = false
		},
		
		setUserLoading: (state, { payload }) => {
			state.loading = payload
		},
		
		removeUserData: (state) => {
			state.data = {}
			state.available = false
			state.loading = false
		},
	}
})
export default UserSlice.reducer;
export const { setUserData, setUserTest, removeUserData, setUserLoading } = UserSlice.actions