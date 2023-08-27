// Site Constants
export const tokenCookieName = "iechat-user-token"

// Dynamic paths
export const host = process.env.NEXT_PUBLIC_HOST ? process.env.NEXT_PUBLIC_HOST : "https://chat.elpis.cc"
export const backendLocation: string = process.env.NEXT_PUBLIC_BACK_END ? process.env.NEXT_PUBLIC_BACK_END : "https://api.chat.elpis.cc"