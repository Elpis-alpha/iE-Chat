import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import activeRoomSlice from "./slice/activeRoomSlice";
import roomsSlice from "./slice/roomsSlice";

const store = configureStore({
	reducer: {
		user: userSlice,
		rooms: roomsSlice,
		activeRoom: activeRoomSlice,
	}
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch