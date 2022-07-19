import React from "react"
import { useConversations } from "../context/ConversationsProvider"

function ContactMessages({
  name,
  changeShowChat,
  changeShowMessages,
  isSelected,
  index,
  lastMessage,
}) {
  //See the current selected conversation
  const { setSelectedConversationIndex, conversations } = useConversations()
  const updateChatAndMessagesDivs = (e) => {
    e.preventDefault()
    setSelectedConversationIndex(index)
    changeShowChat(e)
    changeShowMessages(e)
  }
  return (
    <div
      className={`w-full h-20 border-b-2 border-black mt-0 pt-2 md3:!h-16 md2:!h-14 md:!h-20 sm:!h-16 rsm:!h-14 usm:!h-10] ${
        isSelected ? "bg-gray-200" : "bg-white"
      }`}
      onClick={(e) => updateChatAndMessagesDivs(e)}
    >
      <div className="relative w-24 h-full float-left  ml-4 lg1:!ml-1 lg1:!w-16 md2:!w-12 md:!w-24 sm:!w-20 rsm:!w-12 usm:!w-10">
        <div
          className="absolute centerSom w-16 h-16 rounded-full bg-cover lg:!w-14 lg:!h-14 md3:!w-12 md3:!h-12 md2:!w-10 md2:!h-10 md:!w-16 md:!h-16 sm:!w-14 sm:!h-14 rsm:!w-10 rsm:!h-10 usm:!w-8 usm:!h-8"
          style={{ backgroundImage: `url("/images/profile.png")` }}
        ></div>
      </div>
      <div className=" w-80 h-full inline-block  mr-12  lg3:!mr-0 lg:!w-72 md3:!w-64 md2:!w-60 md:!w-80 md:!float-none md:!inline-block md:!ml-2 sm:!w-80 rsm:!w-60 usm:!w-56">
        <div className="relative w-full h-1/2 ">
          <h2 className="w-full absolute centerVertical text-lg font-bold text-slate-900 truncate lg:!text-base md3:!text-sm md:!text-lg rsm:!text-xs usm:!text-rsmall">
            {name}
          </h2>
        </div>
        <div className="relative w-full h-1/2 ">
          <p className="w-full absolute centerVertical text-lg text-slate-900 truncate lg:!text-base md3:!text-sm md:!text-lg rsm:!text-xs usm:!text-rsmall">
            {lastMessage ? lastMessage : ""}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContactMessages
