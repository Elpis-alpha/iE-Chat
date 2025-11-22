import { findOrCreateDialogueURL, setBlockRoomsURL } from '@/source/api'
import { postApiJson } from '@/source/controllers/APICtrl'
import { useAppSelector } from '@/source/store/hooks'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const NewRoom = () => {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const { data: userData } = useAppSelector(store => store.user)
  const { dialogueUser } = useAppSelector(store => store.activeRoom)

  const unblockUser = async () => {
    if (saving) return toast("Please wait")
    setSaving(true)

    const ss = toast.loading("Unblocking " + dialogueUser?.name)
    const serverData = await postApiJson(setBlockRoomsURL(), { groupID: dialogueUser?.room?._id, value: false })

    if (!serverData.error) {
      toast.success("Unblocked Successfully", { id: ss });
      return router.push(`/me/chat?room=${dialogueUser?.room?._id}`)
    } else {
      toast.error("An Error Occured", { id: ss });
    }
    setSaving(false)
  }

  const startConversation = async () => {
    if (saving) return toast("Please wait")
    setSaving(true)

    const ss = toast.loading("Starting Conversation")
    const serverData = await postApiJson(findOrCreateDialogueURL(), {
      friendID: dialogueUser?._id,
      onlyExist: false
    })

    if (serverData?.data?.groupType === "dialogue") {
      toast.success("Conversation Started", { id: ss });
      return router.push(`/me/chat?room=${serverData?.data?._id}`)
    } else {
      toast.error("An Error Occured", { id: ss });
    }
    setSaving(false)
  }

  return (
    <div className='flex flex-1 w-full p-6 justify-center items-center flex-col text-center'>
      {!dialogueUser?.room && <>
        <h4 className='text-xl font-semibold pb-2'>Start a Conversation with {dialogueUser?.name}</h4>
        <button disabled={saving} onClick={startConversation} className='bg-main-blue text-white px-5 py-2 rounded-xl shake-button'>Start Conversation</button>
      </>}

      {(dialogueUser?.room && dialogueUser?.room?.blocked?.by === dialogueUser._id) && <>
        <h4 className='text-xl font-semibold pb-2'>{dialogueUser?.name} blocked you</h4>
      </>}

      {(dialogueUser?.room && dialogueUser?.room?.blocked?.by !== dialogueUser._id) && <>
        <h4 className='text-xl font-semibold pb-2'>You blocked {dialogueUser?.name}</h4>
        <button disabled={saving} onClick={unblockUser} className='bg-main-blue text-white px-5 py-2 rounded-xl shake-button'>Unblock</button>
      </>}
    </div>
  )
}

export default NewRoom