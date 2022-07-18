import React, { useState, useRef } from "react"
import Modal from "react-modal"
import Messages from "./Messages"
import Chat from "./Chat"
import { useContacts } from "./context/ContactsProvider"
import { useConversations } from "./context/ConversationsProvider"

function Body({ currentUserID }) {
  const [showMessages, setShowMessages] = useState(true)
  const [showChat, setShowChat] = useState(false)
  const [manageNewButton, setManageNewButton] = useState("Message")
  const changeShowMessages = (e) => {
    e.preventDefault()
    setShowMessages(!showMessages)
  }
  const changeShowChat = (e) => {
    e.preventDefault()
    setShowChat(!showChat)
  }
  //Manage modal
  const [messagesModalIsOpen, setMessagesModalIsOpen] = useState(false)
  const [contactsModalIsOpen, setContactsModalIsOpen] = useState(false)
  const openMessagesModalView = () => {
    setMessagesModalIsOpen(true)
  }
  const closeMessagesModalView = () => {
    setMessagesModalIsOpen(false)
  }
  const openContactsModalView = () => {
    setContactsModalIsOpen(true)
  }
  const closeContactsModalView = () => {
    setContactsModalIsOpen(false)
  }
  //New contacts
  const idRef = useRef()
  const nameRef = useRef()
  //Call the contactCreation function that lives on the context file
  const { contacts, createContact } = useContacts()
  const [selectedContactsIDs, setSelectedContactsIDs] = useState([])
  const submitNewContactForm = (e) => {
    e.preventDefault()
    createContact(idRef.current.value, nameRef.current.value)
    closeContactsModalView()
  }
  //Conversation
  //Contacts that are already with a conversation
  const { conversations, createConversation } = useConversations()
  const handleMessageSelection = (contactId) => {
    setSelectedContactsIDs((prevSelectedContactsIds) => {
      //Check if contact id is already on list and remove it
      if (prevSelectedContactsIds.includes(contactId)) {
        return prevSelectedContactsIds.filter((prevId) => {
          return contactId !== prevId
        })
      } else {
        return [...prevSelectedContactsIds, contactId]
      }
    })
  }
  const submitNewMessageForm = (e) => {
    e.preventDefault()
    createConversation(selectedContactsIDs)
    setSelectedContactsIDs([])
    closeMessagesModalView()
  }
  return (
    <div className=" grid grid-cols-3 w-full h-4/5 bg-green-200">
      <Messages
        showMessages={showMessages}
        changeShowMessages={changeShowMessages}
        changeShowChat={changeShowChat}
        setManageNewButton={setManageNewButton}
        manageNewButton={manageNewButton}
        currentUserID={currentUserID}
        openMessagesModalView={openMessagesModalView}
        openContactsModalView={openContactsModalView}
      />
      <Chat
        showChat={showChat}
        changeShowMessages={changeShowMessages}
        changeShowChat={changeShowChat}
      />
      {/* New Messages modal */}
      <Modal
        isOpen={messagesModalIsOpen}
        onRequestClose={closeMessagesModalView}
        className="w-2/3 h-1/2 bg-gray-100 centerSom"
        ariaHideApp={false}
      >
        <div className="w-full h-full border-2 border-black relative">
          <div className="w-10 h-10 absolute top-0 right-0 z-10 rsm:!w-6 rsm:!h-6 ">
            <button
              className="w-full h-full z-50"
              onClick={(e) => closeMessagesModalView(e)}
            >
              <span class="material-symbols-outlined text-3xl sm:!text-2xl">
                close
              </span>
            </button>
          </div>
          <div className="w-full h-1/5 border-2 border-black relative">
            <h2 className="w-full text-center absolute centerVertical text-black font-medium text-3xl tracking-widest sm:!text-xl rsm:!text-lg rsm:!tracking-normal usm:!text-base">
              New Message
            </h2>
          </div>
          <div className="w-full h-4/5 border-2 border-black p-4">
            <form
              onSubmit={submitNewMessageForm}
              className="w-full h-full relative"
            >
              <div className="w-full h-3/4  grid grid-cols-3 overflow-y-scroll md2:!grid-cols-2 sm2:!grid-cols-1 ">
                <h4 className="text-xl mb-1 col-span-3 md2:!col-span-2 sm2:!col-span-1 ">
                  TO:{" "}
                </h4>
                {contacts.map((contact) => (
                  <div id={contact.id} key={contact.id}>
                    <input
                      className="h-4 w-4 border-3 border-black rounded-xl mb-4"
                      type="Checkbox"
                      name="IdCheck"
                      id="idCheck"
                      value={selectedContactsIDs.includes(contact.id)}
                      onChange={() => handleMessageSelection(contact.id)}
                    />
                    <label
                      htmlFor="idCheck"
                      className="text-xl text-black ml-2 rsm:!text-base usm:!text-sm"
                    >
                      {contact.name}
                    </label>
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className="w-32 h-10 mt-4 !bg-green-300 text-white rounded-lg hover:!bg-gray-300 hover:!text-black z-50 absolute centerHorizontal"
              >
                Message
              </button>
            </form>
          </div>
        </div>
      </Modal>
      {/* New contacts Modal */}
      <Modal
        isOpen={contactsModalIsOpen}
        onRequestClose={closeContactsModalView}
        className="w-2/3 h-1/2 bg-gray-100 centerSom"
        ariaHideApp={false}
      >
        <div className="w-full h-full border-2 border-black relative">
          <div className="w-10 h-10 absolute top-0 right-0 z-10 rsm:!w-6 rsm:!h-6">
            <button
              className="w-full h-full z-50"
              onClick={(e) => closeContactsModalView(e)}
            >
              <span class="material-symbols-outlined text-3xl sm:!text-2xl">
                close
              </span>
            </button>
          </div>
          <div className="w-full h-1/5 border-2 border-black relative">
            <h2 className="w-full text-center absolute centerVertical text-black font-medium text-3xl tracking-widest sm:!text-xl rsm:!text-lg rsm:!tracking-normal">
              New Contact
            </h2>
          </div>
          <div className="w-full h-4/5 border-2 border-black p-4">
            <form onSubmit={submitNewContactForm} className="w-full h-full">
              <h4 className="text-lg mb-1">ID: </h4>
              <input
                className="px-1 h-10 w-1/2 border-2 border-black rounded-xl mb-4 md2:!w-full"
                type="text"
                name="Id"
                id="id"
                ref={idRef}
                required
              />
              <h4 className="text-lg mb-1">Name: </h4>
              <input
                className="px-1 h-10 w-1/2 border-2 border-black rounded-xl block mb-4 md2:!w-full"
                type="text"
                name="name"
                id="name"
                ref={nameRef}
                required
              />
              <button
                type="submit"
                className="w-32 h-10 !bg-green-300 text-white rounded-lg hover:!bg-gray-300 hover:!text-black z-50"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Body
