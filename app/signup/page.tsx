'use client';
import { tokenCookieName } from '@/source/__env';
import { checkGoogleUserURL, createUserURL, googleAuthURL } from '@/source/api';
import Logo from '@/source/components/Logo'
import { postApiJson } from '@/source/controllers/APICtrl';
import { validatePassword, waitFor } from '@/source/controllers/SpecialCtrl';
import { validateUsername } from '@/source/controllers/helpers';
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
  const dispatch = useDispatch()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [passwordText, setPasswordText] = useState("")
  const [usernameText, setUsernameText] = useState("")
  const [saving, setSaving] = useState(false)
  const [showLoadUsername, setShowLoadUsername] = useState(false)
  const signData = useRef({ name: "", username: "", password: "", token: "" })
  const startRechecking = useRef({ start: true, stop: false })
  const checkGoogle = useRef<"" | "google">("")

  const validateInputPassword = (e: any) => {
    const text = e.target.value as string
    setPasswordText(validatePassword(text))
  }

  const validateInputUsername = async (e: any) => {
    const text = e.target.value as string
    if (text.trim().length < 1) return setUsernameText("Provide a username")

    setShowLoadUsername(true)
    setUsernameText("")
    const msg = await validateUsername(text.trim())
    setUsernameText(msg)
    setShowLoadUsername(false)
  }

  const handleInputUsername = (e: any) => {
    let value: string = e.target.value ?? ""
    value = value.toLowerCase()
    value = value.replace(/[^a-z\-\_0-9]/g, "")

    signData.current.username = value
    e.target.value = value
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (saving) return toast("Please wait")
    setSaving(true)
    const tt = toast.loading("Validating")

    const { name, password, username } = signData.current
    const usernameMsg = await validateUsername(username)
    if (name.trim().length < 1) { toast.dismiss(tt); setSaving(false); return toast.error('Name is too short!') }
    if (validatePassword(password)) { toast.dismiss(tt); setSaving(false); return toast.error("Password: " + validatePassword(password)) }
    if (usernameMsg) { toast.dismiss(tt); setSaving(false); return toast.error(usernameMsg) }

    const serverData = await postApiJson(createUserURL(), { name, password, username })
    toast.dismiss(tt)
    if (!serverData.error) signinUser(serverData)
    else {
      toast.error("An error occured")
    }
    setSaving(false)
  }

  const signinUser = useCallback(async (data: any) => {
    if (!data?.token) toast.error("Invalid user")
    setSaving(true)
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
        if (checkGoogle.current === "google" && signData.current.token.length > 1) {
          console.log("checking google")
          const serverData = await postApiJson(checkGoogleUserURL(), { token: signData.current.token })
          if (!serverData.error) { checkGoogle.current = ""; signinUser(serverData) }
        }
        await waitFor(1000)
      }
    }
    if (startRechecking.current.start) { recheckData(); startRechecking.current = { start: true, stop: false } }
    return () => { startRechecking.current = { start: startRechecking.current.start, stop: true } }
  }, [signinUser])

  const handleGoogle = async () => {
    if (saving) return toast("Please wait")
    setSaving(true)

    checkGoogle.current = "google"
    const token = v4() + "---" + v4()
    signData.current.token = token

    const handle = window.open(googleAuthURL(token), "_blank", "popup=yes")
    setSaving(false)

    if (!handle) return toast.error("Please enable browser popup!")
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-5 px-5 py-10 text-sm sm:text-base">
      <div className="flex flex-col items-center justify-center gap-8 text-center">
        <Link href="/" className='block mx-auto'><Logo className="w-[80%] mx-auto max-w-[300px] md:w-[300px]" /></Link>
        <div className="w-full">
          <div className="px-6 sm:px-4 max-w-[260px] mx-auto">
            <button type="button" disabled={saving} onClick={handleGoogle} className="text-white w-full  bg-[#4285F4] focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2 shake-button">
              <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
              Sign up with Google<div></div>
            </button>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="flex w-[80px] h-[1px] bg-black"></span> OR <span className="flex w-[80px] h-[1px] bg-black"></span>
          </div>
          <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto text-left'>
            <div className="block pt-2">
              <label htmlFor="name" className='text-black font-medium pb-0.5 block'>Display Name</label>
              <input required readOnly={saving} type="text" id='name' name='name' autoComplete='name' placeholder='Enter your Display Name'
                onInput={(e: any) => signData.current.name = e.target.value}
                className='text-xs px-3 py-2.5 bg-blue-50 bg-opacity-90 rounded-lg border-[#59398216] border shadow-sm shadow-[#5939823e] flex w-full' />
            </div>
            <div className="block pt-2">
              <label htmlFor="username" className='text-black font-medium pb-0.5 block'>Username</label>
              <div className="block">
                <input required readOnly={saving} type="text" id='username' name='username' autoComplete='username' placeholder='Enter your Display Username' onBlur={validateInputUsername}
                  onInput={handleInputUsername}
                  className='text-xs px-3 py-2.5 bg-blue-50 bg-opacity-90 rounded-lg border-[#59398216] border shadow-sm shadow-[#5939823e] flex w-full' />
                {showLoadUsername && <span className="absolute top-0 right-0 bottom-0 flex items-center justify-center px-4"><Oval color='rgb(111, 0, 255)' width={20} secondaryColor='rgba(111, 0, 255, 0.4)' /></span>}
              </div>
              {usernameText && <small className='absolute top-full left-0 text-[red] text-xs leading-normal'>{usernameText}</small>}
            </div>
            <div className={"transition-[padding] " + (usernameText ? "pt-6" : "pt-2")}>
              <label htmlFor="password" className='text-black font-medium pb-0.5 block'>Password</label>
              <div className="vlock">
                <input required readOnly={saving} type={showPassword ? "text" : "password"} id='password' name='password' placeholder='●●●●●●●●●●' autoComplete='current-password'
                  onInput={(e: any) => { validateInputPassword(e); signData.current.password = e.target.value }} onBlur={e => validateInputPassword(e)} onFocus={e => validateInputPassword(e)}
                  className='text-xs px-3 py-2.5 bg-blue-50 bg-opacity-90 rounded-lg border-[#59398216] border shadow-sm shadow-[#5939823e] flex w-full pr-9' />
                {showPassword && <button type='button' className="absolute top-0 right-0 bottom-0 flex items-center justify-center px-4" onClick={() => setShowPassword(false)}><FaEyeSlash /></button>}
                {!showPassword && <button type='button' className="absolute top-0 right-0 bottom-0 flex items-center justify-center px-4" onClick={() => setShowPassword(true)}><FaEye /></button>}
              </div>
              {passwordText && <small className='absolute top-full left-0 text-[red] text-xs leading-normal'>{passwordText}</small>}
            </div>
            <div className={"transition-[padding] " + (passwordText ? "pt-6" : "pt-3")}>
              <button disabled={saving} className='justify-center items-center gap-3 inline-flex px-5 py-2.5 bg-main-blue text-white rounded-[10px] shake-button'>
                <span className='font-semibold tracking-wide'>Submit</span>
                {saving ? <Oval color='rgb(255, 255, 255)' width={18} height={18} strokeWidth={4} secondaryColor='rgba(88, 88, 88, 0.4)' /> : <PiPaperPlaneRightFill className="" />}
              </button>
            </div>
          </form>
          <Link href="/login" className='block text-xs w-full text-left pt-1 underline'>Already have an account?</Link>
        </div>
      </div>
    </main>
  )
}
