import React, { useRef } from "react"
import { v4 as uuidV4 } from "uuid"

export default function Login({ setCurrentUserID }) {
  const userIDRef = useRef()
  const login = (e) => {
    e.preventDefault()
    setCurrentUserID(userIDRef.current.value)
  }
  const createNewUserID = (e) => {
    e.preventDefault()
    setCurrentUserID(uuidV4())
  }
  return (
    <div className="w-full h-full relative bg-gray-200">
      <div className="w-96 h-76 border-black border-2 centerSom bg-white sm2:w-72 usm:w-60">
        <div className="w-full h-20 bg-gray-800 relative">
          <h1 className="centerSom text-2xl text-white left-2">Chat App</h1>
        </div>
        <div className="w-full h-50 border-t-2 border-black pb-10 pt-5 px-2">
          <div className="w-full h-10">
            <h2 className="text-2xl text-black px-1 text-center">Login </h2>
          </div>
          <div className="w-full h-10">
            <input
              type="text"
              name="id"
              id="userId"
              className="w-full h-full border-2 border-black rounded-xl px-2"
              placeholder="User ID"
              ref={userIDRef}
            />
          </div>
          <div className="w-full h-10 mt-4">
            <button
              className="w-20 h-full border-black border-2 bg-gray-800 float-left rounded-lg hover:bg-gray-200 text-white"
              onClick={(e) => {
                login(e)
              }}
            >
              Login
            </button>
            <button
              className="w-20 h-full border-black border-2 bg-yellow-200 float-right rounded-lg hover:bg-yellow-50"
              onClick={(e) => {
                createNewUserID(e)
              }}
            >
              Create ID
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
