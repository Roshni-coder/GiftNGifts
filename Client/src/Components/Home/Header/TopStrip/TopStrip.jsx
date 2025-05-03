import React,{useState}from 'react'
import { Link } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import './TopStrip.css';

function TopStrip() {
    const[showMenu,setShowmenu]=useState(false);
    const handleMenu =()=>{
      setShowmenu(!showMenu);
    }
  return (
    <div className='top-strip  sm:!py-0 sm:!pt-1 !py-1 border-t-[1px] border-gray-300 border-b-[1px] bg-[#7d0492] text-white'>
      <div className="container m-auto flex justify-between ">
        <div className="col1 float-start">
            <p className='pera text-[10px] sm:!pt-1 md:!text-[13px]'> Get up to 50% off now season styles, limited time only ....</p>
        </div>

        <div className={showMenu ? "menu-mobile":"menu-web" }>
        <ul className="col2 sm:!pt-1  flex gap-5 justify-end">
                  <li className="list-none">
                    <Link
                      to="/help-center"
                      className="text-[11px] sm:text-[13px]  font-[500] transition"
                    >
                      Help Center{" "}
                    </Link>
                  </li>

                  <li className="list-none">
                    <Link
                      to="/order-tracking"
                      className="text-[11px] sm:text-[12px]  font-[500] transition"
                    >
                      Order Tracking
                    </Link>
                  </li>
                  <li className="list-none">
                    <Link
                      to="/currency"
                      className="text-[11px] sm:text-[12px] font-[500] transition"
                    >
                      Currency
                    </Link>
                  </li>
                </ul>
        </div>
        <div className="menu">
            <button onClick={handleMenu}>
            <MdOutlineMenu/>
            </button>
               </div>
       
      </div>
    </div>
  )
}

export default TopStrip
