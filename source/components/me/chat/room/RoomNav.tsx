import { tokenCookieName } from '@/source/__env'
import { logoutUserURL } from '@/source/api'
import { postApiJson } from '@/source/controllers/APICtrl'
import { useAppSelector } from '@/source/store/hooks'
import { toggleActiveRoomShowMore } from '@/source/store/slice/activeRoomSlice'
import { removeUserData } from '@/source/store/slice/userSlice'
import { formatRelative } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FaAngleLeft, FaTimes } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import Cookies from 'universal-cookie'
import LogoutSVG from '../../svg/LogoutSVG'
import RoomMenu from './RoomMenu'

const RoomNav = ({ roomStatus }: { roomStatus: "new" | "ok" | "loading" }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [processing, setProcessing] = useState(false)
  const { data: roomData, dialogueUser, showMore } = useAppSelector(store => store.activeRoom)
  const { data: userData } = useAppSelector(store => store.user)

  const isDiagogue = roomData?.type === "dialogue"
  const member = roomData?.members?.find(gem => gem._id !== userData?._id)
  const otherMembers = roomData?.members?.filter(gem => gem._id !== userData?._id)

  const ava = isDiagogue ? member?.avatar : roomData?.room?.groupImage
  const name = isDiagogue ? member?.name : roomData?.room?.groupName

  const logoutThisUser = async (e: any) => {
    if (processing) return toast("Please wait")
    setProcessing(true)
    const tt = toast.loading("Logging out")

    const logoutData = await postApiJson(logoutUserURL())
    if (logoutData.error) toast.error("An error occured", { id: tt })
    else {
      toast.success("Logged out", { id: tt })

      const cookie = new Cookies()
      cookie.remove(tokenCookieName, { path: '/' })
      dispatch(removeUserData())
      router.push('/')
    }

  }

  return (
    <div className="w-full flex border-b border-[#B3AAAA] border-opacity-70 pb-3 items-center gap-2 sm:gap-3">
      <Link href={"/me/chat"} className='shake-button'>
        <FaAngleLeft className="w-[18px] sm:w-[25px] h-[50px]" />
      </Link>
      <div className="flex cursor-pointer" onClick={() => dispatch(toggleActiveRoomShowMore())}>
        {roomStatus === "new" && <img src={dialogueUser?.avatar} alt={dialogueUser?.name} className='sm:w-[75px] sm:h-[75px] w-[50px] h-[50px] rounded-full object-cover border border-main-blue border-opacity-5' />}
        {roomStatus === "loading" && <div className="sm:w-[75px] sm:h-[75px] w-[50px] h-[50px] rounded-full skeleton" />}
        {roomStatus === "ok" && <img src={ava} alt={name} className='sm:w-[75px] sm:h-[75px] w-[50px] h-[50px] rounded-full object-cover border border-main-blue border-opacity-5' />}
      </div>
      <div className='flex-1 pl-1 cursor-pointer' onClick={() => dispatch(toggleActiveRoomShowMore())}>
        {(roomStatus === "new" && dialogueUser && dialogueUser.name) && <>
          <h3 className='text-xl sm:text-2xl font-semibold' title={dialogueUser.biography}>{dialogueUser.name}</h3>
          <p className='text-xs sm:text-sm font-extralight tracking-wide'>{dialogueUser.onlineStatus.isOnline ? "Online" : ("Last seen: " + formatRelative(new Date(dialogueUser?.onlineStatus.lastOnline as any), new Date()))}</p>
        </>}
        {(roomStatus === "ok" && roomData?.room) && <>
          <h3 className='text-xl sm:text-2xl font-semibold' title={name}>{name}</h3>
          {isDiagogue && <p className='text-xs sm:text-sm font-extralight tracking-wide'>{member?.onlineStatus.isOnline ? "Online" : ("Last seen: " + formatRelative(new Date(member?.onlineStatus.lastOnline as any), new Date()))}</p>}
          {!isDiagogue && <p className='text-xs sm:text-sm font-extralight tracking-wide line-clamp-1'>
            You
            {otherMembers?.map?.(member => <span key={member._id}>
              , <a className='hover:underline' href={`/me/chat?room=${member._id}-new`} target="_blank" rel="noopener noreferrer">{member.name}</a>
            </span>)}
          </p>}
        </>}
        {(roomStatus === "loading") && <>
          <h4 className="text-base font-medium skeleton text-transparent w-[55%] max-w-[120px] sm:max-w-[150px] h-4 sm:h-6 rounded-xl"></h4>
          <p className="text-sm font-light skeleton text-transparent w-[98%] max-w-[200px] sm:max-w-[200px] h-3 sm:h-4 rounded-xl mt-2"></p>
        </>}
      </div>
      <div className="hidden items-center justify-end vert:b-hori:flex px-[3px]">
        <button onClick={logoutThisUser} className="shake-button"><LogoutSVG width={29} fill="black" /></button>
      </div>
      {showMore && <RoomMenu roomStatus={roomStatus} />}
    </div>
  )
}

export default RoomNav