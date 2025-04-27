import React from 'react'

function Progress(props) {
  return (
    <>
    <div className='w-[100px] !text-left h-auto bg-[#f1f1f1] overflow-hidden rounded-md'>
    <span
      className={`flex items-center h-[8px] bg-blue-500 
        ${props.type === 'success' && 'bg-green-600'} 
        ${props.type === 'error' && 'bg-pink-600'} 
        ${props.type === 'warning' && 'bg-yellow-400'}`}
      style={{ width: `${props.value}%` }}
    ></span>
  </div>
    </>
  )
}

export default Progress
