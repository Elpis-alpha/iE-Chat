import { FiSearch } from "react-icons/fi"
import ChatListItemLoad from "./list/ChatListItemLoad"

const LoadingChatsList = () => {
  return (
    <div className="flex flex-col w-full h-full vert:gap-4 hori:gap-[22px]">
      <div className="w-full">
        <input type={"text"} placeholder='Search' readOnly
          className='pr-3 pl-12 pt-3.5 pb-3 bg-blue-50 bg-opacity-90 rounded-3xl border-[#59398216] border shadow-sm shadow-[#5939823e] flex w-full bg-white' />
        <button type='button' className="absolute top-0 left-0 bottom-0 flex items-center justify-center px-4 text-[#7C7C7C] text-lg sm:text-xl"><FiSearch /></button>
      </div>
      <div className="w-full flex-1 bg-white rounded-3xl border-[#59398216] border shadow-sm shadow-[#5939823e] overflow-hidden">
        <div className="hori:absolute top-0 left-0 right-0 bottom-0 w-full h-full overflow-auto p-4 flex flex-col">
          <h2 className="vert:hidden hori:block text-2xl font-semibold pb-4 text-[#303030] line-clamp-1 shrink-0">
            Chats
          </h2>
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex flex-col gap-4 flex-1 absolute top-0 left-0 right-0 bottom-0 w-full h-full overflow-hidden">
              {Array(5).fill("ll-loader").map((id, i, x) => <ChatListItemLoad key={id + i} lastItem={!(i + 1 < x.length)} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LoadingChatsList