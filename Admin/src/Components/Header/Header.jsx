import React, { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";

import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import { FaRegUser } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

function Header() {
  const [anchorMyAccont, setAnchorMyAccont] = useState(null);
  const openMyAcc = Boolean(anchorMyAccont);

  const handleClickMyAcc = (event) => {
    setAnchorMyAccont(event.currentTarget);
  };

  const handleCloseMyAcc = () => {
    setAnchorMyAccont(null);
  };

  return (
    <>
      <header className="ml-auto  shadow-md w-[82%] !py-4 h-auto  items-center bg-white ">
        <div className="loginBtn flex justify-end w-full ">
          {/* Login buttpm */}
          <Link to='/login'>
          <button
            onClick={handleClickMyAcc}
            className=" cursor-pointer !border-2 !border-gray-300 text-[18px] !text-gray-500 !mr-6  rounded pt-1 !pb-2  px-8  "
          >
            Login
          </button>
          </Link>
        </div>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorMyAccont}
          id="account-menu"
          open={openMyAcc}
          onClose={handleCloseMyAcc}
          onClick={handleCloseMyAcc}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
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
          <MenuItem onClick={handleCloseMyAcc} className="!bg-white ">
            <div className="flex items-center !gap-2">
              <div
                className="rounded-full w-[38px]  h-[38px]  overflow-hidden cursor-pointer"
                onClick={handleClickMyAcc}
              >
                <FaCircleUser className="text-[35px] text-gray-600 " />
              </div>
              <div className="info">
                <h3 className="text-[16px] font-[500] !leading-5">
                  Bhoi Roshni
                </h3>
                <p className="text-[12px] !opacity-70 font-[400]">
                  roshnibhoi@gmail.com
                </p>
              </div>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={handleCloseMyAcc}
            className="flex items-center gap-3 !ml-2"
          >
            <FaRegUser className="text-[16px]" />{" "}
            <span className="text-[14px]">My account</span>
          </MenuItem>
          <MenuItem
            onClick={handleCloseMyAcc}
            className="flex items-center gap-3 !ml-2"
          >
            <PiSignOutBold className="text-[16px]" />{" "}
            <span className="text-[14px]">Sign Out</span>
          </MenuItem>
        </Menu>
      </header>
    </>
  );
}

export default Header;
