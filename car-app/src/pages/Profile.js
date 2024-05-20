import React from "react"


export default function Profile({user}) {

  return (
    <div className=" bg-cardbackground m-auto mt-10 relative w-[600px] h-[300px]">
      <div className="flex gap-6">
        <div className="w-[300px]">
            <div className='pl-1'>
              <img alt={user.first_name || ""}  src={user.image || ''} className='w-[100px] h-[150px] object-cover m-3 ' />
            </div>
          <div className="flex flex-col pl-2">
            <div className="grid gap-1.5 mt-4 text-sm text-gray-500 dark:text-gray-400 flex-1 p-1">
              <p className="font-medium"><span className='font-semibold'>Name:</span>  {user.first_name || ""} {user.last_name || ""}</p>
              <p><span className='font-semibold'>Email:</span> {user.user_email || ""}</p>
              <p><span className='font-semibold'>Contact:</span> {user.contact || ""}</p>
              <p><span className='font-semibold'>Role:</span> {user.role || ""}</p>
            </div>
          </div>
        </div>
        </div>
    </div>
  )
}

