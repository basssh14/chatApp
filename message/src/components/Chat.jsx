import React, { useState, useCallback } from "react"
import Message from "./individual/Message"
import { useConversations } from "./context/ConversationsProvider"
function Chat({ showChat, changeShowMessages, changeShowChat }) {
  const { sendMessage, selectedConversation } = useConversations()
  const [text, setText] = useState("")
  console.log("selected conversation", selectedConversation)
  const handleNewMessageSubmit = (e) => {
    e.preventDefault()
    const recipientsID = selectedConversation.recipients.map((r) => r.id)
    sendMessage(recipientsID, text)
    setText("")
  }
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])

  const updateChatAndMessagesDivs = (e) => {
    e.preventDefault()
    changeShowChat(e)
    changeShowMessages(e)
  }
  return (
    <div
      className={`col-span-2 w-full h-full bg-white ${
        showChat ? "md:!col-span-3" : "md:!hidden"
      }`}
    >
      <div className="relative h-20/2 w-full border-l-3 border-r-3 border-b-3 border-black">
        <div className="absolute top-0 left-0 h-full w-16  inline-block p-0 rsm:!w-8">
          <button
            className="m-0 w-full h-full"
            onClick={(e) => updateChatAndMessagesDivs(e)}
          >
            <span class="w-10 h-10 material-symbols-outlined  text-4xl mt-1">
              arrow_back
            </span>
          </button>
        </div>
        <div className="absolute top-0 left-16 h-full w-2/3  inline-block  sm:!w-4/5 rsm:!left-10">
          <div className="w-full h-full absolute left ">
            <div className="relative inline-block w-auto h-full float-left ml-4">
              <div
                className="absolute centerSom  w-12 h-12 rounded-full bg-cover sm:!w-10 sm:!h-10"
                style={{ backgroundImage: `url("/images/profile.png")` }}
              ></div>
            </div>
            <div className="w-5/6 h-full float-right   mr-16  lg2:!mr-14 sm2:!mr-8 lg1:!mr-12 lg:!mr-10 sm:!mr-0 sm:!ml-8  sm:!w-64 sm:!float-none sm:!inline-block rsm:!w-44 rsm:!ml-6 usm:!w-40">
              <div className="relative w-full h-full">
                <h2 className=" w-full absolute centerVertical left-3 truncate  text-lg font-bold text-slate-900 md:!left-2 sm:!left-0 sm:!text-base usm:!text-sm">
                  {selectedConversation.recipients
                    ? selectedConversation.recipients
                        .map((r) => r.name)
                        .join(", ")
                    : " Error"}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 h-full w-16 inline-block p-0 sm:!w-14 rsm:!w-12">
          <button className="m-0 w-full h-full relative">
            <span class="w-10 h-10 material-symbols-outlined  text-4xl mt-1">
              menu
            </span>
          </button>
        </div>
      </div>
      <div className="h-180/2 w-full border-l-3 border-r-3 border-black p-5 sm:!px-2 sm:!py-4">
        <div className="w-full h-full">
          <div className="relative h-180/2 w-full mb-2">
            <div className="absolute w-full h-full border-2 border-black rounded-lg overflow-y-scroll">
              <div className="w-full h-auto grid grid-cols-1">
                {selectedConversation
                  ? selectedConversation.messages.map((message, index) => {
                      const lastMessage =
                        selectedConversation.messages.length - 1 === index
                      return (
                        <Message
                          ref={lastMessage ? setRef : null}
                          key={index}
                          text={message.text}
                          user={message.fromMe}
                          name={message.senderName}
                        />
                      )
                    })
                  : ""}
              </div>
            </div>
          </div>
          <div className="h-20/2 w-full  relative">
            <div className="w-full h-full  absolute centerVertical">
              <form onSubmit={handleNewMessageSubmit} className="w-full h-full">
                <div className="w-180/2 h-full  inline-block sm:!w-5/6 rsm:!w-4/5">
                  <input
                    type="text"
                    name="message"
                    value={text}
                    id=""
                    className="w-full h-full border-2 border-black rounded-lg px-2"
                    placeholder="Type your message..."
                    onChange={(event) => setText(event.target.value)}
                  />
                </div>
                <div className="w-12 h-full border-2 border-black rounded-full float-right inline-block">
                  <button className="m-0 w-full h-full" type="submit">
                    <span class="w-10 h-10 material-symbols-outlined text-4xl ml-0.5 mt-1">
                      send
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
