import { findUserByUsernameURL } from "../api"
import { getApiJson } from "./APICtrl"

export const validateUsername = async (username: string) => {
	try {
		const userExists = await getApiJson(findUserByUsernameURL(username))
		console.log(userExists)
		if (userExists?.error?.endsWith?.('not exist')) return ""
		else return "Username is taken, choose another"
	} catch (error) {
		return "Username is taken, choose another"
	}
}