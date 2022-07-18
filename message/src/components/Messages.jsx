import React, { useState } from "react"
import ContactMessages from "./individual/ContactMessages"
import Contacts from "./individual/Contacts"
import { useContacts } from "./context/ContactsProvider"
import { useConversations } from "./context/ConversationsProvider"

function Messages({
  showMessages,
  changeShowMessages,
  changeShowChat,
  currentUserID,
  openMessagesModalView,
  openContactsModalView,
}) {
  //Display the contact or messages side bar
  const [displayContactMessages, setDisplayContactMessages] = useState(true)
  const [displayContacts, setDisplayContacts] = useState(false)
  const showContactMessages = (e) => {
    e.preventDefault()
    setDisplayContactMessages(true)
    setDisplayContacts(false)
  }
  const showContacts = (e) => {
    e.preventDefault()
    setDisplayContactMessages(false)
    setDisplayContacts(true)
  }
  //Display the new message/contact screen
  const newMessage = (e) => {
    e.preventDefault()
    openMessagesModalView()
  }
  const newContact = (e) => {
    e.preventDefault()
    openContactsModalView()
  }
  //Handle the contacts dynamic display
  const { contacts } = useContacts()
  //Handle messages dynamic display
  const { conversations } = useConversations()
  return (
    <div
      className={`w-full h-full bg-white ${
        showMessages ? "md:!col-span-3" : "md:!hidden"
      }`}
    >
      <div className="h-20/2 w-full">
        <div className="h-full w-1/2 float-left border-b-3 border-r-2 border-black">
          <button
            className="h-full w-full text-xl text-slate-900"
            onClick={(e) => showContactMessages(e)}
          >
            Messages
          </button>
        </div>
        <div className="h-full w-1/2 float-left border-b-3 border-l-2 border-black">
          <button
            className="h-full w-full text-xl text-slate-900"
            onClick={(e) => showContacts(e)}
          >
            Contacts
          </button>
        </div>
      </div>
      <div className="h-4/5 w-full relative">
        <div
          className={`w-full h-full absolute overflow-y-scroll ${
            displayContactMessages ? "" : "hidden"
          }`}
        >
          {conversations.map((conversation, index) => (
            <ContactMessages
              name={conversation.recipients
                .map((recipient) => recipient.name)
                .join(", ")}
              key={index}
              changeShowChat={changeShowChat}
              changeShowMessages={changeShowMessages}
              isSelected={conversation.selected}
              index={index}
              lastMessage={
                conversation.messages[conversation.messages.length - 1]
                  ? conversation.messages[conversation.messages.length - 1].text
                  : " "
              }
            />
          ))}
        </div>
        <div
          className={`w-full h-full absolute overflow-y-scroll ${
            displayContacts ? "" : "hidden"
          }`}
        >
          {contacts.map((contact) => (
            <Contacts name={contact.name} id={contact.id} />
          ))}
        </div>

        <div
          className={`w-14 h-14 rounded-full absolute bottom-2 right-2 bg-gray-100  ${
            displayContactMessages ? "" : "hidden"
          }`}
        >
          <button
            className="w-full h-full relative"
            onClick={(e) => newMessage(e)}
          >
            <span class="material-symbols-outlined text-4xl centerSom">
              add
            </span>
          </button>
        </div>
        <div
          className={`w-14 h-14 rounded-full absolute bottom-2 right-2 bg-gray-100 ${
            displayContacts ? "" : "hidden"
          }`}
        >
          <button
            className="w-full h-full relative"
            onClick={(e) => newContact(e)}
          >
            <span className="material-symbols-outlined text-4xl centerSom">
              add
            </span>
          </button>
        </div>
      </div>
      <div className="h-20/2 w-full border-t-2 border-black relative text-center bg-gray-100">
        <h3 className="centerSom text-xl text-black w-full lg1:text-lg md3:text-base">
          Your ID:{" "}
          <span className="text-base lg1:text-sm md3:text-xs text-gray-600">
            {currentUserID}
          </span>
        </h3>
      </div>
    </div>
  )
}

export default Messages
