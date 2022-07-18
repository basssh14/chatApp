import React from "react"
function Contacts({ name, id }) {
  return (
    <div className="relative w-full h-20 border-b-2 border-black" id={id}>
      <div className="w-full h-full absolute left ">
        <div className="relative w-1/5 h-full float-left ">
          <div
            className="absolute centerSom w-16 h-16 rounded-full bg-cover lg:!w-14 lg:!h-14 md3:!w-12 md3:!h-12 md2:!w-10 md2:!h-10 md:!w-16 md:!h-16 sm:!w-14 sm:!h-14 rsm:!w-10 rsm:!h-10 usm:!w-8 usm:!h-8"
            style={{ backgroundImage: `url("/images/profile.png")` }}
          ></div>
        </div>
        <div className="w-4/5 h-full float-right">
          <div className="relative w-full h-full">
            <h2 className="absolute centerVertical left-0  text-lg font-bold text-slate-900 md3:!text-base md:!text-lg rsm:!text-base usm:!text-sm">
              {name}
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacts
