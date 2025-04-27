import React from 'react'

function Badges(props) {
  return (
    <div>
      <span className={`inline-block items-center py-2 justify-center rounded-full text-[12px]  px-4 ${props.status === 'Pending' && 'bg-purple-950 text-white'} ${props.status === 'Confirm' && 'bg-yellow-500 text-white'} ${props.status === 'Delivered' && 'bg-green-600 text-white'}`}>{props.status}</span>
    </div>
  )
}

export default Badges
