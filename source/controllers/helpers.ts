import { format, formatRelative } from "date-fns"
import { findUserByUsernameURL } from "../api"
import { getApiJson } from "./APICtrl"
import { capitalize } from "./SpecialCtrl"

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

export const formatChatsTime = (date: Date) => {
	date = new Date(date)

	if (new Date().getDate() === date.getDate()) return format(date, "p")
	if (new Date().getDate() === date.getDate() + 1) return "Yesterday"
	return format(date, "d/M/yy")
}

export const parseAdminMessage = (inputString: string, idNameMap: { id: string, name: string }[]) => {
	// Regular expression to match <id-...> patterns
	const regex = /<id-(.*?)>/g;

	// Use a callback function with replace() to replace the patterns
	const resultString = inputString.replace(regex, (match, id) => {
		// Find the corresponding name in the idNameMap
		const matchedItem = idNameMap.find(item => item.id === id);

		// If a match is found, return the name; otherwise, return the original match
		return matchedItem ? matchedItem.name : match;
	});

	return resultString;
}