import { backendLocation } from './__env'

const generateLSSB = (limit = 10, skip = 0, sortBy = "createdAt:desc") => `?limit=${limit}&skip=${skip}&sortBy=${sortBy}`

// User Routes
export const createUserURL = () => `${backendLocation}/api/user/create`
export const getUserURL = () => `${backendLocation}/api/user/get`
export const editUserURL = () => `${backendLocation}/api/user/edit`
export const deleteUserURL = () => `${backendLocation}/api/user/delete`
export const changeUsernameURL = () => `${backendLocation}/api/user/change-username`
export const filterUsersURL = (username?: string, limit?: number, skip?: number, sortBy?: string) => `${backendLocation}/api/user/filter${generateLSSB(limit, skip, sortBy)}${username ? `&username=${username}` : ``}`
export const uploadAvatarURL = () => `${backendLocation}/api/user/avatar/upload`
export const deleteAvatarURL = () => `${backendLocation}/api/user/avatar/remove`
export const userExistenceURL = (username: string) => `${backendLocation}/api/user/exists?username=${username}`
export const loginUserURL = () => `${backendLocation}/api/user/login`
export const logoutUserURL = () => `${backendLocation}/api/user/logout`
