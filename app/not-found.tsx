import Logo from '@/source/components/Logo'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-5 p-5">
			<Logo className="w-56" />
			<p>Lost {"aren't"} we? <Link href="/" className="text-[red] cursor-pointer hover:underline">go home</Link></p>
		</main>
  )
}
