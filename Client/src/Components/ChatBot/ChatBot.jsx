import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { TbHeadphonesFilled } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: '🎉 Welcome to GiftGrove – your online destination for birthday gifts!' },
    { from: 'bot', text: 'How can I assist you today? 😊' },
  ]);
  const [input, setInput] = useState('');
  const [isAwaitingOrderId, setIsAwaitingOrderId] = useState(false);

  const options = [
    'About Store',
    'Contact Details',
    'Track Delivery',
    'Return Policy',
    'Offers & Discounts',
    'Birthday Gift Ideas',
    'Store Location',
    'Payment Methods',
    'Customer Reviews',
    'Cancel Order',
  ];

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { from: 'user', text }]);
    setInput('');

    let botReply = '';

    if (isAwaitingOrderId) {
      botReply = `📦 Order ID ${text} will be delivered on April 7, 2025, between 10:00 AM and 2:00 PM.`;
      setIsAwaitingOrderId(false);
    } else {
      switch (text.toLowerCase()) {
        case 'about store':
          botReply = '🎁 We are an online store specializing in birthday gifts, party decorations, and surprises for your loved ones!';
          break;
        case 'contact details':
          botReply = '📞 You can reach us at ‪+91-1234567890‬ or email us at support@giftgrove.com';
          break;
        case 'track delivery':
          botReply = '🚚 Please enter your *Order ID* to track your delivery.';
          setIsAwaitingOrderId(true);
          break;
        case 'return policy':
          botReply = '🔄 You can return items within 7 days of delivery. Terms apply.';
          break;
        case 'offers & discounts':
          botReply = '💸 Enjoy up to 60% off on birthday gift combos. Don’t miss out!';
          break;
          case 'cancel order':
            botReply = '❌ To cancel your order, contact support@giftgrove.com within 24 hours of placing the order.';
            break;
        case 'birthday gift ideas':
          botReply = '🎂 Popular birthday gifts include personalized mugs, LED photo frames, surprise boxes, and cakes!';
          break;
        case 'store location':
          botReply = '📍 We operate online, but our main warehouse is located in Ahmedabad, Gujarat.';
          break;
        case 'payment methods':
          botReply = '💳 We accept UPI, Credit/Debit Cards, Netbanking, and Cash on Delivery.';
          break;
        case 'customer reviews':
          botReply = '📝 Our store has a 4.8★ rating from 1,200+ happy customers!';
          break;
        default:
          botReply = '🤖 Sorry, I didn’t catch that. Please choose an option or try rephrasing!';
          break;
      }
    }

    setMessages(prev => [...prev, { from: 'bot', text: botReply }]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="chat-button fixed -right-1 !font-[400]  bottom-10 !py-2 rounded-full px-2 !text-[12px] text-white flex gap-1 bg-purple-950 text-white p-3 rounded hover:brightness-110 transition"
        >
          <TbHeadphonesFilled  className='text-[16px]'/>Chat with us</button>
         
      )}

      {isOpen && (
        <div className="!w-75  sm:w-72 border border-gray-300 h-[500px] bg-white !mb-15 !shadow-md rounded shadow-lg flex flex-col overflow-hidden">
          <div className="bg-[#7d0492] text-white p-4 flex justify-between items-center">
            <span className="text-[18px]">FAQ Bot</span>
            <button onClick={toggleChat} className="!text-white hover:text-gray-200 "><IoMdClose className='!text-[18px]' /></button>
          </div>

          <div className="flex-1 !p-2 !px-2  overflow-y-scroll space-y-2">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`px-3 pt-1 pb-2 rounded-lg text-sm  whitespace-pre-line ${
                    msg.from === 'user' ? 'bg-[#7d0492] !text-white' : 'bg-gray-200'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Options */}
          <div className="flex flex-wrap gap-1 !p-1  !py-2 !px-3">
            {options.map((opt, i) => (
              <button
                key={i}
                className="!text-[13px] px-3 py-1 !border !border-gray-400 !text-gray-400 rounded  transition"
                onClick={() => handleSend(opt)}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex  items-center border shadow border-gray-300 !p-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 !text-black text-sm px-2 py-1 outline-none"
            />
            <button type="submit" className="!text-[#7d0492] hover:brightness-110 p-1">
              <FaPaperPlane className='!text-[#7d0492]' />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
