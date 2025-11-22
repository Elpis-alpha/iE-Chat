"use client"
import { createGroupURL, deleteAvatarURL, editUserURL, uploadAvatarURL } from '@/source/api'
import { deleteApiJson, patchApiJson, postApiFormData } from '@/source/controllers/APICtrl'
import { validateUsername } from '@/source/controllers/helpers'
import { useAppSelector } from '@/source/store/hooks'
import { setUserData } from '@/source/store/slice/userSlice'
import { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaPen, FaSave, FaTrash } from 'react-icons/fa'
import { BiImageAdd } from 'react-icons/bi'
import { Oval } from 'react-loader-spinner'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'

export default function Home() {
	const router = useRouter()
	const dispatch = useDispatch()
	const inputRef = useRef(null)
	const inputRef2 = useRef(null)
	const [dragActive, setDragActive] = useState(false);
	const [saving, setSaving] = useState(false)
	const signData = useRef({
		name: "",
		description: "",
		image: null,
	})
	const [imageViewURL, setImageViewURL] = useState("")

	const removeImage = async () => {
		if (inputRef?.current) (inputRef.current as HTMLInputElement).value = ""
		if (inputRef2?.current) (inputRef2.current as HTMLInputElement).value = ""
		setImageViewURL("")
		if (setImageViewURL) setImageViewURL("")
		setDragActive(false)
	}

	const apiRemoveImage = async () => {
		removeImage()
	}

	const handleImageInput = (e: any) => {
		const input = e.target
		inputImage(input?.files?.[0])
	}

	const handleDrag = (e: any) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	};

	const inputImage = (img: any) => {
		setDragActive(false)
		if (img?.['type']?.includes?.('image')) {
			var reader = new FileReader();
			reader.onload = function (e: any) {
				setImageViewURL(e?.target?.result)
				if (setImageViewURL) setImageViewURL(e?.target?.result)
				signData.current.image = img
			};
			reader.onerror = () => { toast.error("Invalid File"); removeImage() }
			reader.readAsDataURL(img);
		} else { toast.error("Invalid File"); removeImage() }
	}

	const handleDrop = (e: any) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
			inputImage(e?.dataTransfer?.files?.[0])
		}
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		if (saving) return toast("Please wait")
		setSaving(true)

		const { name, description, image } = signData.current

		const tt = toast.loading("Validating")
		if (name.trim().length < 1) { toast.dismiss(tt); setSaving(false); return toast.error('group-Name is too short!') }
		toast.loading("Saving", { id: tt })

		const serverData = await postApiFormData(createGroupURL(), { name, description, image })
		if (!serverData.error && serverData?.roomKey) {
			toast.success("Group created", { id: tt })
			router.push('/me/chat')
		} else {
			toast.error("An error occured", { id: tt })
			setSaving(false)
		}
	}

	return (
		<section className="flex-1 text-sm sm:text-base flex">
			<div className="flex flex-col items-center justify-center my-auto p-5 hori:pl-10 hori:absolute top-0 left-0 right-0 bottom-0 w-full h-full vert:py-8 hori:overflow-auto">
				<div className="max-w-[400px] w-full text-left ">
					<div className="block">
						<div className="">
							<h1 className="text-2xl font-semibold text-black text-center pb-4">Create Group</h1>
						</div>
						<div className="flex w-[150px] h-[150px]  mx-auto flex-1 border border-linkGreen rounded-full overflow-hidden text-white">
							<div className={"z-40 absolute top-0 left-0 right-0 bottom-0 w-full h-full " + (dragActive ? "bg-[#ffffff52]" : "")}>
								<input onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onInput={handleImageInput} onDrop={handleDrop} ref={inputRef}
									className="opacity-0 cursor-pointer w-full h-full block" type="file" name="report-image" id="report-image" accept="image/*" />
							</div>
							{imageViewURL === "" && <div className="z-20 absolute top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center">
								<div className="m-auto text-center text-black">
									<div className="text-7xl text-linkGreen flex items-center justify-center"><BiImageAdd /></div>
								</div>
							</div>}
							{imageViewURL !== "" && <div className="z-20 absolute top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center">
								<img src={imageViewURL} alt="Report" className="w-full h-full object-cover" />
							</div>}
							{imageViewURL !== "" && <div className="z-50 absolute top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center items-center gap-4 opacity-0 hover:opacity-100 hover:bg-black/40">
								<button type="button" className="flex items-center justify-center w-10 h-10 text-lg rounded-full text-linkGreen hover:text-black border-2 border-linkGreen hover:bg-white overflow-hidden cursor-pointer">
									<FaPen />
									<input onInput={handleImageInput} ref={inputRef2}
										className="opacity-0 cursor-pointer w-full h-full block absolute top-0 left-0 right-0 bottom-0 z-20"
										type="file" name="report-image2" id="report-image2" accept="image/*" />
								</button>
								<button type="button" onClick={apiRemoveImage} className="flex items-center justify-center w-10 h-10 text-lg rounded-full text-[#ff2b2b] hover:text-white border-2 border-[#ff2b2b] hover:bg-[#ff2b2b]">
									<FaTrash />
								</button>
							</div>}
						</div>
					</div>
					<form onSubmit={handleSubmit} className="contents">
						<div className="block pt-2">
							<label htmlFor="group-name" className='text-black font-medium pb-0.5 block'>Name</label>
							<input required readOnly={saving} type="text" id='group-name' name='group-name' autoComplete='group-name' placeholder='Enter your Group Name'
								onInput={(e: any) => signData.current.name = e.target.value} defaultValue={signData.current.name}
								className='text-xs px-3 py-2.5 bg-blue-50 bg-opacity-90 rounded-lg border-[#59398216] border shadow-sm shadow-[#5939823e] flex w-full' />
						</div>
						<div className={"block pt-2"}>
							<label htmlFor="description" className='text-black font-medium pb-0.5 block'>Description</label>
							<div className="block">
								<textarea name="description" id="description" readOnly={saving} placeholder='Enter your Description' defaultValue={signData.current.description}
									onInput={(e: any) => signData.current.description = e.target.value}
									className='text-xs px-3 py-2.5 bg-blue-50 bg-opacity-90 rounded-lg border-[#59398216] border shadow-sm shadow-[#5939823e] flex w-full h-20'
								></textarea>
							</div>
						</div>
						<div className={"transition-[padding] pt-2"}>
							<button disabled={saving} className='justify-center items-center gap-3 inline-flex px-5 py-2.5 bg-main-blue text-white rounded-[10px] shake-button'>
								<span className='font-semibold tracking-wide'>Save</span>
								{saving ? <Oval color='rgb(255, 255, 255)' width={18} height={18} strokeWidth={4} secondaryColor='rgba(88, 88, 88, 0.4)' /> : <FaSave className="" />}
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	)
}
