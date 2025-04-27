import React from 'react'
import { IoSearch } from "react-icons/io5";

function SearchBox() {
  return (
    <div>
      <div className="w-full px-2 items-center  overflow-hidden flex h-auto rounded-md reletive bg-[#f1f1f1]">
        <input type="text" className='w-full px-3 !h-[40px] rounded-md text-[13px] bg-[#f1f1f1] focus:outline-none'placeholder='Search Product ......'  />
        <IoSearch className='!text-[18px] text-gray-500'/>
      </div>
    </div>
  )
}

export default SearchBox
