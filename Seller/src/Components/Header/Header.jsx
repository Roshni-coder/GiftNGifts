import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";

import { Admincontext } from "../context/admincontext"; // Update path based on your structure

function Header() {
  const [anchorMyAccount, setAnchorMyAccount] = useState(null);
  const openMyAccount = Boolean(anchorMyAccount);
  const { atoken, setatoken } = useContext(Admincontext);
  const name = localStorage.getItem("name") || "";
  const navigate = useNavigate();

  const handleClickMyAccount = (event) => {
    if (atoken) {
      setAnchorMyAccount(event.currentTarget);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("atoken");
    localStorage.removeItem("name");
    setatoken(""); // clear context token
    navigate("/login");
  };

  const handleCloseMyAccount = () => {
    setAnchorMyAccount(null);
  };

  return (
    <>
      <header className="ml-auto shadow-md w-[82%] py-4 h-auto items-center bg-white">
        <div className="loginBtn flex justify-end w-full pr-6">
          {atoken && (
            <div
              onClick={handleClickMyAccount}
              className="cursor-pointer bg-[#5f6fff] text-white text-[18px] font-semibold rounded-full w-10 h-10 flex items-center justify-center"
              title="Account"
            >
              {name[0]?.toUpperCase()}
            </div>
          )}
        </div>

        <Menu
          anchorEl={anchorMyAccount}
          id="account-menu"
          open={openMyAccount}
          onClose={handleCloseMyAccount}
          onClick={handleCloseMyAccount}
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
              <div className="rounded-full w-[38px] h-[38px] bg-[#5f6fff] text-white flex items-center justify-center text-lg font-semibold">
                {name[0]?.toUpperCase()}
              </div>
              <div className="info">
                <h3 className="text-[16px] font-[500] leading-5">{name}</h3>
              </div>
            </div>
          </MenuItem>

          <Divider />

          <MenuItem className="flex items-center gap-3 ml-2">
            <FaRegUser className="text-[16px]" />
            <span className="text-[14px]">My Account</span>
          </MenuItem>

          <MenuItem
            onClick={handleLogout}
            className="flex items-center gap-3 ml-2"
          >
            <PiSignOutBold className="text-[16px]" />
            <span className="text-[14px]">Sign Out</span>
          </MenuItem>
        </Menu>
      </header>
    </>
  );
}

export default Header;
