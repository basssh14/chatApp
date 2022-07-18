import React, { forwardRef } from "react"

function Message({ text, user, name }, ref) {
  const side = user === "self" ? "float-right" : "float-left"
  const color = user === "self" ? "bg-green-400" : "bg-yellow-300"
  return (
    <div className="w-full h-auto col-span-1" ref={ref}>
      <p
        className={`w-96 h-auto ${color} m-2 p-2 rounded-lg text-justify border-2 border-black ${side} sm2:!w-80 sm:!text-sm sm:!w-72 rsm:!w-52 rsm:!text-xs rsm:!text-left usm:!w-48 usm:!text-rsmall`}
      >
        <span className="text-md font-bold">
          {user === "self" ? "You" : name}
        </span>{" "}
        <br />
        {text}
      </p>
    </div>
  )
}

export default forwardRef(Message)
