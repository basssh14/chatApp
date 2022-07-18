import React from "react"
import "../App.css"
import "../output.css"
function Header() {
  return (
    <div className=" relative h-20/2 w-full bg-gray-800 border-b-2 border-white">
      <h1 className=" absolute centerVertical left-10 text-2xl text-white font-semibold">
        {" "}
        Chat App{" "}
      </h1>
    </div>
  )
}

export default Header
