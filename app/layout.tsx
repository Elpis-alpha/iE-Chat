import './styles/global.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ["200", "400"],
  variable: "--font-poppins",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: 'iE Chat - A Messaging Platform',
  description: 'Welcome to our chat community! Our platform is all about connecting and learning from each other. Connect with us and experience a new world.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#b1dbff"></meta>
      </head>
      <body className={`${poppins.variable} font-poppins tracking-wide`}>
        {children}
      </body>
    </html>
  )
}
