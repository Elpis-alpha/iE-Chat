import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoomsURL, getUserURL } from "../../api";
import { getApiJson } from "../../controllers/APICtrl";
import { removeRoomsData, setRoomsData, setRefetchRooms, setRoomsLoading } from "../../store/slice/roomsSlice";
import { removeUserData, setUserData } from "../../store/slice/userSlice";

const FetchAppData = () => {
	const dispatch = useDispatch()
	const { available } = useSelector((store: any) => store.user)
	const { refetchRooms } = useSelector((store: any) => store.rooms)

	useEffect(() => {
		// Fetch User Data
		const fetchUser = async () => {
			dispatch(setRefetchRooms(false))
			const userData = await getApiJson(getUserURL())
			if (userData.error) dispatch(removeUserData())
			else dispatch(setUserData(userData))
			return userData
		}
		// Fetch Rooms Data
		fetchUser().then(async userData => {
			if (userData.error) return dispatch(removeRoomsData())
			dispatch(setRoomsLoading(true))
			const roomsData = await getApiJson(getAllRoomsURL())
			if (roomsData.error) dispatch(removeRoomsData())
			else dispatch(setRoomsData(roomsData.data))
		})
	}, [dispatch])

	useEffect(() => {
		// Fetch Rooms Data
		const fetchRoomsData = async () => {
			dispatch(setRefetchRooms(false))
			dispatch(setRoomsLoading(true))
			const roomsData = await getApiJson(getAllRoomsURL())
			if (roomsData.error) dispatch(removeRoomsData())
			else dispatch(setRoomsData(roomsData.data))
		}
		if (available && refetchRooms) fetchRoomsData()
	}, [dispatch, available, refetchRooms])

	return <></>
}
export default FetchAppData