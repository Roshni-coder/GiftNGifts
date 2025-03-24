import React from 'react'
// import './styles.css';
import { TbHeadphonesFilled } from "react-icons/tb";

function ChatBot() {
  return (
    <div>
     <button className="chat-button bg-purple-950 fixed  right-0 !font-[400]  bottom-12 !py-2 rounded-full px-2 !text-[12px] text-white flex gap-1 " ><TbHeadphonesFilled  className='text-[16px]'/>Chat with us</button>
    </div>
  )
}

export default ChatBot
