interface roomListItemDataType {
	profile: {
		memberID: string
		isAdmin: boolean
		joinedOn: Date
		unread: number
		muted: boolean
		pinned: boolean
	}
	groupID: string, name?: string, image?: string, groupType: "dialogue" | "group", friend?: { name: string, _id: string }, friends?: { name: string, _id: string }[]
	recent: {
		message: string
		date: Date
	}
	blocked: {
		status: boolean
		by: string
	}
	members: string[]
	message: messageType
}

interface messageType {
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
}

interface userType {
	_id: string
	name: string
	username: string
	biography?: string
	sendWithEnter: boolean
	onlineStatus: {
		isOnline: boolean
		lastOnline: Date
	}
	avatar: string
	createdAt: Date
	updatedAt: Date
}

interface roomType {
	_id: string
	members: {
		memberID: string
		isAdmin: boolean
		joinedOn: Date
		unread: number
		muted: boolean
		pinned: boolean
	}[]
	groupImage?: string
	groupName?: string
	groupDescription?: string
	groupType: "dialogue" | "group"
	recent: {
		message: string
		date: Date
	}
	blocked: {
		status: boolean
		by: string
	}
	createdAt: Date
	updatedAt: Date
}

interface roomUserType {
	_id: string
	name: string
	username: string
	avatar: string
	biography: string
	sendWithEnter: boolean
	onlineStatus: {
		isOnline: boolean
		lastOnline: Date
	}
	createdAt: Date
	updatedAt: Date
}

interface activeRoomDataType {
	type: "group" | "dialogue" | "new-dialogue"
	room?: roomType
	members?: roomUserType[]
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
}