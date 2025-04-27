import React, { useState } from "react";
import Button from "@mui/material/Button";
import { RiMenu2Fill } from "react-icons/ri";
import { GoTriangleDown } from "react-icons/go";
import { Link } from "react-router-dom";
import { MdOutlineRocketLaunch } from "react-icons/md";
import CategoryPanel from "./CategoryPanel.jsx";
import menuItems from "../../../Consone/menuItems.js";

function NavCategory() {
  const [isOpenCatPanel, setIsOpenCategoryPanel] = useState(false);

  const openCategoryPanel = () => {
    setIsOpenCategoryPanel(true);
  };

  return (
    <>
      <nav className="py-1 border-t border-b !border-gray-200 ">
        <div className="container gap-3 m-auto grid lg:grid-cols-12">
          {/* Category Button */}
          <div className="lg:col-span-3 ">
            <Button
              className="!text-black gap-2 !flex !items-center !justify-start !font-[600] w-full"
              onClick={openCategoryPanel}
            >
              <RiMenu2Fill className="!text-[15px] !ml-0" />
              <p className="!text-[14px] !mb-0"> Shop By Categories</p>
              <GoTriangleDown className="!text-[16px] ml-auto " />
            </Button>
          </div>

          {/* Navigation Menu */}
          <div className="lg:col-span-7 hidden    lg:block">
            <ul className="flex items-center justify-start">
              {menuItems.map((menu) => (
                <li key={menu.name} className="relative group xl:px-3">
                  <Link to="/">
                    <Button
                      className="!text-black !text-[13px] hover:!text-[#7d0492]"
                      style={{ textTransform: "capitalize" }}
                    >
                      {menu.name}
                    </Button>
                  </Link>

                  {/* Submenu */}
                  <div className="submenu absolute top-[130%] left-1/2 transform -translate-x-1/2 min-w-[800px] bg-white shadow-lg border border-gray-200 opacity-0 invisible transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:visible z-10">
                    <ul className="grid grid-cols-6 gap-1 p-6">
                      {menu.submenu.map((item, index) => (
                        <li
                          key={`${menu.name}-${item}-${index}`} // Combine menu name, item, and index for unique keys
                          className="list-none text-[14px]"
                        >
                          <Link
                            to="/"
                            className="text-[rgba(0,0,0,0.8)] hover:text-[#7d0492] transition-colors duration-200"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Delivery Info */}
          <div className="lg:col-span-2 hidden lg:block ">
            <p className="lg:!text-[11px] xl:!text-[14px] font-[500] flex items-center justify-end gap-1 pt-1 ">
              <MdOutlineRocketLaunch className="text-[14px]" />
              Free International Delivery
            </p>
          </div>
        </div>
      </nav>

      <CategoryPanel
        openCategoryPanel={openCategoryPanel}
        setisOpenCategoryPanel={setIsOpenCategoryPanel}
        isOpenCatPanel={isOpenCatPanel}
      />
      
    </>
  );
}

export default NavCategory;
