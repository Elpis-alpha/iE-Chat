'use client';
import { tokenCookieName } from '@/source/__env';
import { checkGoogleUserURL, googleAuthURL, loginUserURL } from '@/source/api';
import Logo from '@/source/components/Logo'
import { postApiJson } from '@/source/controllers/APICtrl';
import { waitFor } from '@/source/controllers/SpecialCtrl';
import { setUserData } from '@/source/store/slice/userSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { PiPaperPlaneRightFill } from 'react-icons/pi';
import { Oval } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import { v4 } from 'uuid';

export default function Home() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [saving, setSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const loginData = useRef({ username: "", password: "", token: "" })
  const startRechecking = useRef({ start: true, stop: false })
  const checkGoogle = useRef<"" | "google">("")

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (saving) return toast("Please wait")
    setSaving(true)
    const tt = toast.loading("Validating")

    const { password, username } = loginData.current
    if (username.trim().length < 1) { toast.dismiss(tt); setSaving(false); return toast.error('Username is too short!') }
    if (password.length < 1) { toast.dismiss(tt); setSaving(false); return toast.error('Password is too short!') }

    const serverData = await postApiJson(loginUserURL(), { password, username })
    if (!serverData.error) loginUser(serverData, tt)
    else {
      toast.error(serverData.error.endsWith("Unable to login") ? "Invalid credentials" : "An error occured", { id: tt })
    }
    setSaving(false)
  }

  const handleGoogle = async () => {
    if (saving) return toast("Please wait")
    setSaving(true)

    checkGoogle.current = "google"
    const token = v4() + "---" + v4()
    loginData.current.token = token

    const handle = window.open(googleAuthURL(token), "_blank", "popup=yes")
    setSaving(false)

    if (!handle) return toast.error("Please enable browser popup!")
  }

  const loginUser = useCallback(async (data: any, id?: string) => {
    if (!data?.token) toast.error("Invalid user")
    setSaving(true)

    if (id) toast.success("Logged in", { id })
    else toast.success("Logged in")

    dispatch(setUserData({ ...data }))
    // dispatch(setRefetchCart(true))
    const cookie = new Cookies()
    cookie.set(tokenCookieName, data.token, { path: '/', expires: new Date(90 ** 7) })
    router.push('/me')
  }, [dispatch, router])

  useEffect(() => {
    const recheckData = async () => {
      while (!startRechecking.current.stop) {
        console.log("checking")
        if (checkGoogle.current === "google" && loginData.current.token.length > 1) {
          console.log("checking google")
          const serverData = await postApiJson(checkGoogleUserURL(), { token: loginData.current.token })
          if (!serverData.error) { checkGoogle.current = ""; loginUser(serverData) }
        }
        await waitFor(1000)
      }
    }
    if (startRechecking.current.start) { recheckData(); startRechecking.current = { start: true, stop: false } }
    return () => { startRechecking.current = { start: startRechecking.current.start, stop: true } }
  }, [loginUser])

  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-5 px-5 py-10 text-sm sm:text-base">
      <div className="flex flex-col items-center justify-center gap-8 text-center">
        <Link href="/" className='block mx-auto'><Logo className="w-[80%] mx-auto max-w-[300px] md:w-[300px]" /></Link>
        <div className="w-full">
          <div className="px-6 sm:px-4 max-w-[260px] mx-auto">
            <button type="button" disabled={saving} onClick={handleGoogle} className="text-white w-full  bg-[#4285F4] focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2 shake-button">
              <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
              Log in with Google<div></div>
            </button>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="flex w-[80px] h-[1px] bg-black"></span> OR <span className="flex w-[80px] h-[1px] bg-black"></span>
          </div>
          <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto text-left'>
            <div className="block pt-2">
              <label htmlFor="username" className='text-black font-medium pb-0.5 block'>Username</label>
              <div className="block">
                <input required readOnly={saving} type="text" id='username' name='username' autoComplete='username' placeholder='Enter your Display Username'
                  onInput={(e: any) => loginData.current.username = e.target.value}
                  className='text-xs px-3 py-2.5 bg-blue-50 bg-opacity-90 rounded-lg border-[#59398216] border shadow-sm shadow-[#5939823e] flex w-full' />
              </div>
            </div>
            <div className="block pt-2">
              <label htmlFor="password" className='text-black font-medium pb-0.5 block'>Password</label>
              <div className="vlock">
                <input required readOnly={saving} type={showPassword ? "text" : "password"} id='password' name='password' placeholder='●●●●●●●●●●' autoComplete='current-password'
                  onInput={(e: any) => loginData.current.password = e.target.value}
                  className='text-xs px-3 py-2.5 bg-blue-50 bg-opacity-90 rounded-lg border-[#59398216] border shadow-sm shadow-[#5939823e] flex w-full' />
                {showPassword && <button type='button' className="absolute top-0 right-0 bottom-0 flex items-center justify-center px-4" onClick={() => setShowPassword(false)}><FaEyeSlash /></button>}
                {!showPassword && <button type='button' className="absolute top-0 right-0 bottom-0 flex items-center justify-center px-4" onClick={() => setShowPassword(true)}><FaEye /></button>}
              </div>
            </div>
            <div className="pt-3">
              <button disabled={saving} className='justify-center items-center gap-3 inline-flex px-5 py-2.5 bg-main-blue text-white rounded-[10px] shake-button'>
                <span className='font-semibold tracking-wide'>Submit</span>
                {saving ? <Oval color='rgb(255, 255, 255)' width={18} height={18} strokeWidth={4} secondaryColor='rgba(88, 88, 88, 0.4)' /> : <PiPaperPlaneRightFill className="" />}
              </button>
            </div>
          </form>
          <Link href="/signup" className='block text-xs w-full text-left pt-1 underline'>Create a new account?</Link>
        </div>
      </div>
    </main>
  )
}
