'use client'
import Logo from "@/source/components/Logo"
import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	return (
		<main className="flex-1 flex flex-col items-center justify-center gap-5 p-5">
			<Logo className="w-56" />
			<p>Something fishy happened, <span onClick={() => reset()} className="text-[red] cursor-pointer hover:underline">reload</span>/<span onClick={() => window?.location?.reload?.()} className="text-[red] cursor-pointer hover:underline">refresh</span></p>
		</main>
	)
}