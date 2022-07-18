import React from "react"
import { useContext, useEffect, useState } from "react"
import io from "socket.io-client"

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ currentUserID, children }) {
  const [socket, setSocket] = useState()

  useEffect(() => {
    const newSocket = io("http://localhost:5001", {
      query: { id: currentUserID },
    })
    setSocket(newSocket)
    return () => newSocket.close()
  }, [currentUserID])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}
