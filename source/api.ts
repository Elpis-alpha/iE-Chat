import { backendLocation } from './__env'

const generateLSSB = (limit = 10, skip = 0, sortBy = "createdAt:desc") => `?limit=${limit}&skip=${skip}&sortBy=${sortBy}`

// User Routes
export const createUserURL = () => `${backendLocation}/api/user/create`
export const checkGoogleUserURL = () => `${backendLocation}/api/user/check-google`
export const getUserURL = () => `${backendLocation}/api/user/get`
export const editUserURL = () => `${backendLocation}/api/user/edit`
export const deleteUserURL = () => `${backendLocation}/api/user/delete`
export const changeUsernameURL = () => `${backendLocation}/api/user/change-username`
export const filterUsersURL = (username: string, limit: number, skip: number) => `${backendLocation}/api/user/filter${generateLSSB(limit, skip)}&username=${username}`
export const findUserByUsernameURL = (username: string) => `${backendLocation}/api/user/find?username=${username}`
export const findUserByIDURL = (_id: string) => `${backendLocation}/api/user/find?_id=${_id}`
export const uploadAvatarURL = () => `${backendLocation}/api/user/avatar/upload`
export const deleteAvatarURL = () => `${backendLocation}/api/user/avatar/remove`
export const userExistenceURL = (username: string) => `${backendLocation}/api/user/exists?username=${username}`
export const loginUserURL = () => `${backendLocation}/api/user/login`
export const logoutUserURL = () => `${backendLocation}/api/user/logout`


// Room Routes
export const getAllRoomsURL = () => `${backendLocation}/api/chat/room/get-all`
export const findOrCreateDialogueURL = () => `${backendLocation}/api/chat/dialogue/find-or-create`
export const getRoomURL = (groupID: string) => `${backendLocation}/api/chat/room/get?groupID=${groupID}`
export const setBlockRoomsURL = () => `${backendLocation}/api/chat/room/set-block-status`
export const deleteGroupURL = () => `${backendLocation}/api/chat/room/delete`
export const addGroupMemberURL = () => `${backendLocation}/api/chat/group/add-member`

export const createGroupURL = () => `${backendLocation}/api/chat/group/create`


// Normal Routes
export const googleAuthURL = (token: string) => `${backendLocation}/api/oauth/google?token=${token}`