import React, { useContext, useState, useEffect, useCallback } from "react"
import useLocalStorage from "../../hooks/useLocalStorage"
import { useContacts } from "./ContactsProvider"
import { useSocket } from "./SocketProvider"

const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationsProvider({ currentUserID, children }) {
  //Handle the socket stuff
  const socket = useSocket()
  //Change the bg color or the selected conversation
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  //Bring the contacts in
  const { contacts } = useContacts()
  const [conversations, setConversations] = useLocalStorage("conversations", [])
  const createConversation = (recipients) => {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }]
    })
  }
  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prevConversations) => {
        let doesTheConversationAlreadyExist = false
        let newMessage = { sender, text }
        //Checks if there is a conversation that matches the recipients
        let updateConversationWithRecipients = prevConversations.map(
          (conversation) => {
            if (arrayEquality(conversation.recipients, recipients)) {
              doesTheConversationAlreadyExist = true
              return {
                ...conversation,
                messages: [...conversation.messages, newMessage],
              }
            }
            return conversation
          }
        )
        if (doesTheConversationAlreadyExist) {
          return updateConversationWithRecipients
        } else {
          return [...prevConversations, { recipients, messages: [newMessage] }]
        }
      })
    },
    [setConversations]
  )

  useEffect(() => {
    if (socket == null) return

    socket.on("receive-message", addMessageToConversation)
    return () => socket.off("receiver-message")
  }, [socket, addMessageToConversation])

  const sendMessage = (recipients, text) => {
    socket.emit("send-message", { recipients, text })
    //console.log(currentUserID)
    addMessageToConversation({ recipients, text, sender: currentUserID })
  }
  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient
      })
      const name = (contact && contact.name) || recipient
      return { id: recipient, name }
    })
    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender
      })
      const name = (contact && contact.name) || message.sender
      const fromMe = currentUserID === message.sender ? "self" : "other"
      return { ...message, senderName: name, fromMe }
    })
    const selected = index === selectedConversationIndex
    return { ...conversation, messages, recipients, selected }
  })
  const value = {
    conversations: formattedConversations,
    createConversation,
    setSelectedConversationIndex,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
  }
  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}

//Check if the recipients from one conversation matches other recipients
//In here to allow us to search for right conversation

const arrayEquality = (a, b) => {
  if (a.length !== b.length) return false
  //We put the a, b array in order based on sort order**
  a.sort()
  b.sort()
  return a.every((element, index) => {
    return element === b[index]
  })
}
