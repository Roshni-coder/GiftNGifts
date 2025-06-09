import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import './TopStrip.css'; // optional if you need it for additional overrides

function TopStrip() {
  const [showMenu, setShowmenu] = useState(false);
  const handleMenu = () => {
    setShowmenu(!showMenu);
  };

  return (
    <div className='top-strip sm:py-3 py-1 border-t border-b border-gray-300 bg-[#7d0492] text-white'>
      <div className="container mx-auto flex justify-between items-center px-4">
        
        {/* Left - Message */}
        <div className="text-[10px] sm:text-[12px] md:text-[13px] font-medium truncate max-w-[70%]">
          Get up to 50% off now season styles, limited time only ...
        </div>

        {/* Right - Menu (Desktop) */}
        <ul className="hidden sm:flex gap-5 text-[11px] sm:text-[12px] md:text-[13px] font-medium">
          <li>
            <Link to="/help-center" className="hover:underline">Help Center</Link>
          </li>
          <li>
            <Link to="/order-tracking" className="hover:underline">Order Tracking</Link>
          </li>
          <li>
            <Link to="/currency" className="hover:underline">Currency</Link>
          </li>
        </ul>

        {/* Hamburger Icon (Mobile) */}
        <div className="sm:hidden flex items-center">
          <button onClick={handleMenu}>
            <MdOutlineMenu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="sm:hidden bg-[#7d0492] px-4 pt-2 pb-3">
          <ul className="flex flex-col gap-2 text-[12px] font-medium">
            <li>
              <Link to="/help-center" onClick={handleMenu}>Help Center</Link>
            </li>
            <li>
              <Link to="/order-tracking" onClick={handleMenu}>Order Tracking</Link>
            </li>
            <li>
              <Link to="/currency" onClick={handleMenu}>Currency</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default TopStrip;
