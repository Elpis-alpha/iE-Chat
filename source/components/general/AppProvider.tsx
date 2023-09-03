"use client"
import store from "@/source/store/store"
import { ReactNode } from "react"
import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"
import FetchAppData from "./FetchAppData"

const AppProvider = ({ children }: { children: ReactNode }) => {
	return (
		<Provider store={store}>
			{children}
			<Toaster position="top-right" reverseOrder={false} />
			<FetchAppData />
		</Provider>
	)
}
export default AppProvider