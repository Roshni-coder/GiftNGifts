import React from 'react'
import { MdOutlineCloudUpload } from "react-icons/md";

function UploadImageBox(props) {
  return (
    <div className='uploadBox relative flex flex-col !items-center !justify-center !rounded-sm overflow-hidden border-bashed border-1 border-[rgba(0,0,0,0.4)] bg-gray-100  hover:bg-gray-200 cursor-pointer  w-[100%] h-[170px]'>
      <MdOutlineCloudUpload className='text-[40px] pointer-events-none opacity-35'/>
      <h4 className="text-[14px]">
        Upload Image
      </h4>
      <input type="file" multiple={props.multiple!==undefined ? props.multiple : false} className='absolute top-0 left-0 w-full h-full z-50 opacity-0' />
    </div>
  )
}

export default UploadImageBox
