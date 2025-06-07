import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { FaGift } from "react-icons/fa6";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Admincontext } from "../context/admincontext";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { atoken, setatoken } = useContext(Admincontext);
  const navigate = useNavigate();
  const name = localStorage.getItem("name") || "";

  const handleClick = (event) => {
    if (atoken) setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("atoken");
    localStorage.removeItem("name");
    setatoken("");
    navigate("/login");
  };

  return (
    <header className=" !shadow-md  !bg-white  py-5 px-4 sm:px-6">
      <div className="max-w-[1440px] w-[100%] mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center pl-4 !w-[90%]  lg:p-3  !justify-center gap-2">
          <FaGift className="text-[24px] text-black" />
          <h1 className="text-black text-xl sm:text-[30px] font-bold">
            GiftNGifts
          </h1>
        </div>

        {/* Account Section */}
        {atoken && (
          <div className="w-[10%]  flex justify-end">
            <button
              onClick={handleClick}
              className="bg-[#5f6fff] text-white font-semibold rounded-full w-10 h-10 flex items-center justify-center text-[18px]"
              title="Account"
            >
              {name[0]?.toUpperCase()}
            </button>
          </div>
        )}

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <div className="flex items-center gap-2">
              <div className="w-[38px] h-[38px]  rounded-full bg-[#5f6fff] text-white flex items-center justify-center text-lg font-semibold">
                {name[0]?.toUpperCase()}
              </div>
              <div>
                <h3 className="text-[16px] text-center font-medium leading-5">{name}</h3>
              </div>
            </div>
          </MenuItem>

          <Divider />
          <MenuItem
            onClick={handleLogout}
            className="flex !items-center !justify-center gap-3 ml-2"
          >
            <PiSignOutBold className="text-[16px]" />
            <span className="text-[14px] text-center">Sign Out</span>
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
}

export default Header;
