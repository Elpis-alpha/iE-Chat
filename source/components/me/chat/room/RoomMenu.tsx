import { deleteGroupURL, setBlockRoomsURL } from '@/source/api'
import { deleteApiJson, postApiJson } from '@/source/controllers/APICtrl'
import { useAppSelector } from '@/source/store/hooks'
import { toggleActiveRoomShowMore } from '@/source/store/slice/activeRoomSlice'
import { formatRelative } from 'date-fns'
import { useRouter } from 'next/nav\igation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FaTimes } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { ClipLoader } from 'react-spinners'

const RoomMenu = ({ roomStatus }: { roomStatus: "new" | "ok" | "loading" }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [processing, setProcessing] = useState<"blocking" | "deleting" | "leaving" | "kicking" | "making-admin" | undefined>(undefined)
  const { data: userData } = useAppSelector(store => store.user)
  const { data: roomData, dialogueUser } = useAppSelector(store => store.activeRoom)

  const isDiagogue = roomData?.type === "dialogue"
  const me = roomData?.room?.members?.find(gem => gem.memberID === userData?._id)
  const member = roomData?.members?.find(gem => gem._id !== userData?._id)
  const otherMembers = roomData?.members?.filter(gem => gem._id !== userData?._id)

  console.log(me)
  const blockUser = async () => {
    if (!isDiagogue) return toast.error("You can only block users in a dialogue")
    if (processing) return toast("Please wait")
    if (!member) return toast.error("Member not found")
    if (!roomData?.room?._id) return toast.error("Room not found")

    setProcessing("blocking")

    const serverData = await postApiJson(setBlockRoomsURL(), { groupID: roomData.room?._id, value: true })

    if (serverData.error) {
      setProcessing(undefined)
      toast.error("An error occured")
    } else {
      toast.success("Blocked Successfully")
      router.push('/me/chat')
    }
  }

  const deleteGroup = async () => {
    if (processing) return toast("Please wait")
    if (!roomData?.room?._id) return toast.error("Room not found")

    setProcessing("deleting")

    const serverData = await deleteApiJson(deleteGroupURL(), { groupID: roomData.room?._id, value: true })

    if (serverData.error) {
      setProcessing(undefined)
      toast.error("An error occured")
    } else {
      toast.success("Deleted Successfully")
      router.push('/me/chat')
    }
  }

  const leaveGroup = async () => {
    if (processing) return toast("Please wait")
    if (!roomData?.room?._id) return toast.error("Room not found")

    setProcessing("leaving")

    const serverData = await { error: 'cc' } as any

    if (serverData.error) {
      setProcessing(undefined)
      toast.error("An error occured")
    } else {
      toast.success("Left Successfully")
      router.push('/me/chat')
    }
  }

  const kickUser = async (userID: string) => {
    if (processing) return toast("Please wait")
    if (!roomData?.room?._id) return toast.error("Room not found")

    setProcessing("kicking")

    const serverData = await { error: 'cc' } as any

    if (serverData.error) {
      toast.error("An error occured")
    } else {
      toast.success("Kicked Successfully")
    }
    setProcessing(undefined)
  }

  const makeAdmin = async (userID: string) => {
    if (processing) return toast("Please wait")
    if (!roomData?.room?._id) return toast.error("Room not found")

    setProcessing("making-admin")

    const serverData = await { error: 'cc' } as any

    if (serverData.error) {
      toast.error("An error occured")
    } else {
      toast.success("Made Admin Successfully")
    }
    setProcessing(undefined)
  }

  return (
    <div className='absolute z-30 top-[90%] left-0 right-0 flex items-start justify-start'>
      <div className="w-full max-w-[350px] px-3 py-6 bg-light-blue rounded-xl shadow flex-col justify-start items-center gap-px flex text-center max-h-[350px] overflow-auto">

        {/* For new dialogues */}
        {(roomStatus === "new" && dialogueUser && dialogueUser.name) && <>
          <img className="w-[100px] h-[100px] rounded-full object-cover border border-main-blue border-opacity-5" src={dialogueUser?.avatar} alt={dialogueUser?.name} />
          <h3 className='text-xl sm:text-2xl font-semibold pt-1' title={dialogueUser.biography}>{dialogueUser.name}</h3>
          <p className='text-sm sm:text-base font-normal'>{dialogueUser.username}</p>
          <p className='text-xs sm:text-sm font-extralight tracking-wide'>{dialogueUser.onlineStatus.isOnline ? "Online" : ("Last seen " + formatRelative(new Date(dialogueUser?.onlineStatus.lastOnline as any), new Date()))}</p>
          <p className='text-xs sm:text-sm font-normal pt-1'>{dialogueUser.biography ?? <span className='italic'>No biography present</span>}</p>
        </>}

        {/* For a dialogue */}
        {(roomStatus === "ok" && isDiagogue && member) && <>
          <img className="w-[100px] h-[100px] rounded-full object-cover border border-main-blue border-opacity-5" src={member?.avatar} alt={member?.username} />
          <h3 className='text-xl sm:text-2xl font-semibold pt-1' title={member?.name}>{member?.name}</h3>
          <p className='text-sm sm:text-base font-normal'>{member?.username}</p>
          <p className='text-xs sm:text-sm font-extralight tracking-wide'>{member.onlineStatus.isOnline ? "Online" : ("Last seen " + formatRelative(new Date(member?.onlineStatus.lastOnline as any), new Date()))}</p>
          <p className='text-xs sm:text-sm font-normal pt-1'>{member?.biography ?? <span className='italic'>No biography present</span>}</p>
          <div className="flex gap-2.5">
            <button disabled={!!processing} onClick={blockUser} className="bg-[#930072] text-white px-4 py-1 rounded-md mt-2 shake flex items-center gap-1.5">
              Block
              {processing === "blocking" && <ClipLoader color="#fff" size={16} />}
            </button>
            <button disabled={!!processing} onClick={deleteGroup} className="bg-[#B50000] text-white px-4 py-1 rounded-md mt-2 shake flex items-center gap-1.5">
              Delete
              {processing === "deleting" && <ClipLoader color="#fff" size={16} />}
            </button>
          </div>
        </>}

        {/* For a group */}
        {(roomStatus === "ok" && !isDiagogue) && <>
          <h3 className='text-xl sm:text-2xl font-semibold pt-1' title={roomData?.room?.groupName}>{roomData?.room?.groupName}</h3>
          <p className='text-xs sm:text-sm font-extralight tracking-wide'>{roomData?.room?.members?.length} members</p>
          <p className='text-xs sm:text-sm font-normal pt-1'>{roomData?.room?.groupDescription ?? <span className='italic'>No description present</span>}</p>
          <div className="flex gap-2.5">
            <button disabled={!!processing} onClick={leaveGroup} className="bg-[#930072] text-white px-4 py-1 rounded-md mt-2 shake flex items-center gap-1.5">
              Leave
              {processing === "leaving" && <ClipLoader color="#fff" size={16} />}
            </button>
            {me?.isAdmin && <button disabled={!!processing} onClick={deleteGroup} className="bg-[#B50000] text-white px-4 py-1 rounded-md mt-2 shake flex items-center gap-1.5">
              Delete
              {processing === "deleting" && <ClipLoader color="#fff" size={16} />}
            </button>}
          </div>
        </>}

        <div className="text-[red] absolute top-3 right-3 text-xl cursor-pointer" onClick={() => dispatch(toggleActiveRoomShowMore())}><FaTimes /></div>
      </div>
    </div>
  )
}

export default RoomMenu