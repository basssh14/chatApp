import React from "react"
import "./App.css"
import "./output.css"
import Header from "./components/Header"
import Body from "./components/Body"
import Footer from "./components/Footer"
import Login from "./components/Login"
import useLocalStorage from "./hooks/useLocalStorage"
import { ContactsProvider } from "./components/context/ContactsProvider"
import { ConversationsProvider } from "./components/context/ConversationsProvider"
import { SocketProvider } from "./components/context/SocketProvider"

function App() {
  const [currentUserID, setCurrentUserID] = useLocalStorage("id", null)
  return (
    <div className="h-screen w-screen">
      <SocketProvider currentUserID={currentUserID}>
        <ContactsProvider>
          <ConversationsProvider currentUserID={currentUserID}>
            {!currentUserID ? (
              <Login setCurrentUserID={setCurrentUserID} />
            ) : (
              <div className="h-full w-full">
                <Header /> <Body currentUserID={currentUserID} /> <Footer />
              </div>
            )}
          </ConversationsProvider>
        </ContactsProvider>
      </SocketProvider>
    </div>
  )
}

export default App
