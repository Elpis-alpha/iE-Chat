interface roomListItemDataType {
	profile: {
		memberID: string
		isAdmin: boolean
		joinedOn: NativeDate
		unread: number
		muted: boolean
		pinned: boolean
	}
	groupID: string, name: string, image: string, groupType: "dialogue" | "group", friend?: {username:string, _id: string}
	recent: {
		message: string
		date: NativeDate
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