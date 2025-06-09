import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaAngleDown } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { LuUsers } from "react-icons/lu";
import { RiProductHuntLine } from "react-icons/ri";
import { SiHackthebox } from "react-icons/si";
import { TbCategoryPlus } from "react-icons/tb";
import { CiLogout } from "react-icons/ci";
import { Button } from "@mui/material";
import { Collapse as ReactCollapse } from "react-collapse";
import { MyContext } from "../../App.jsx";

function SideBar() {
  const { setIsOpenAddProductPanel } = useContext(MyContext);
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const isOpenSubmenu = (index) => {
    setSubmenuIndex((prev) => (prev === index ? null : index));
  };

  const handleLogout = () => {
    localStorage.removeItem("stoken");
    navigate("/login");
    setSidebarOpen(false);
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed z-[1050] top-8 !left-5 sm:text-xl text-[15px] px-4 py-2 bg-white text-black rounded shadow-lg border border-gray-200 hover:bg-gray-100"
        aria-label= "Open menu"
      >
         <FaBars />
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed  bg-black !bg-opacity-40 z-[1040]"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 w-[70vw] max-w-[270px] h-full bg-white z-[1051]
          border-r border-gray-200 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <ul className="pt-2 !font-[600]">
          <li>
            <Button
              onClick={toggleSidebar}
              className="float-end !py-4  font-semibold justify-end px-6 flex gap-3 text-[16px] !text-[rgba(0,0,0,0.8)] hover:bg-[#f1f1f1]"
            >
              <FaTimes />
            </Button>
          </li>
          <li>
            <Link to="/" onClick={closeSidebar}>
              <Button className="w-full !py-3  !font-[600] !justify-start !px-6 flex  !gap-3 !text-[16px] !text-[rgba(0,0,0,0.8)] hover:!bg-[#f1f1f1]">
                <RxDashboard className="!text-[18px]" />{" "}
                <span style={{ textTransform: "initial" }}>Dashboard</span>
              </Button>
            </Link>
          </li>
          <li>
             <Link to="/users" onClick={closeSidebar}>
              <Button className="w-full  !py-3   !font-[600] !justify-start !px-6 flex  gap-3 !text-[16px] !text-[rgba(0,0,0,0.8)] hover:!bg-[#f1f1f1]">
                <LuUsers className="!text-[18px]" />{" "}
                <span style={{ textTransform: "initial" }}>Users</span>
              </Button>
            </Link>
          </li>
          <li>
            <Button
              className="w-full !py-3   !font-[600] !justify-start !px-6 flex  !gap-3 !text-[16px] !text-[rgba(0,0,0,0.8)] hover:!bg-[#f1f1f1]"
              onClick={() => isOpenSubmenu(3)}
            >
              <RiProductHuntLine className="!text-[20px]" />
              <span style={{ textTransform: "initial" }}>Products</span>
              <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center ">
                <FaAngleDown
                  className={`transition-all ${
                    submenuIndex === 3 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>

            <ReactCollapse isOpened={submenuIndex === 3 ? true : false}>
              <ul className="w-full">
                <li className="!w-full">
                  <Link to="/products" onClick={closeSidebar}>
                    <Button
                      style={{ textTransform: "initial" }}
                      className="!text-[rgba(0,0,0,0.7)] !w-full !justify-start !text-[13px] !flex !gap-3 !pl-9 !font-[500]"
                    >
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>{" "}
                      Product List
                    </Button>
                  </Link>
                </li>
                <li className="!w-full">
                  <Button
                    style={{ textTransform: "initial" }}
                    className="!text-[rgba(0,0,0,0.7)] !w-full !justify-start !text-[13px] !flex !gap-3  !pl-9 !font-[500]"
                    onClick={() => {
                      setIsOpenAddProductPanel({
                        open: true,
                        model: "Add Product",
                      });
                      closeSidebar();
                    }}
                  >
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Product Upload
                  </Button>
                </li>
              </ul>
            </ReactCollapse>
          </li>
          <li>
            <Button
              className="w-full !py-3   !font-[600] !justify-start !px-6 flex  !gap-3 !text-[16px] !text-[rgba(0,0,0,0.8)] hover:!bg-[#f1f1f1]"
              onClick={() => isOpenSubmenu(4)}
            >
              <TbCategoryPlus className="!text-[19px]" />
              <span style={{ textTransform: "initial" }}>Category</span>
              <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center ">
                <FaAngleDown
                  className={`transition-all ${
                    submenuIndex === 4 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>

            <ReactCollapse isOpened={submenuIndex === 4 ? true : false}>
              <ul className="w-full">
                <li className="!w-full">
                  <Link to="/categorylist" onClick={closeSidebar}>
                    <Button
                      style={{ textTransform: "initial" }}
                      className="!text-[rgba(0,0,0,0.7)] !w-full !justify-start !text-[13px] !flex !gap-3 !pl-9 !font-[500]"
                    >
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>{" "}
                      Category List
                    </Button>
                  </Link>
                </li>
                <li className="!w-full">
                  <Button
                    style={{ textTransform: "initial" }}
                    className="!text-[rgba(0,0,0,0.7)] !w-full !justify-start !text-[13px] !flex !gap-3  !pl-9 !font-[500]"
                    onClick={() => {
                      setIsOpenAddProductPanel({
                        open: true,
                        model: "Add New Category",
                      });
                      closeSidebar();
                    }}
                  >
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add a Category
                  </Button>
                </li>
                <li className="!w-full">
                  <Link to="/subcategorylist" onClick={closeSidebar}>
                    <Button
                      style={{ textTransform: "initial" }}
                      className="!text-[rgba(0,0,0,0.7)] !w-full !justify-start !text-[13px] !flex !gap-3  !pl-9 !font-[500]"
                    >
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                      Sub Category List
                    </Button>
                  </Link>
                </li>
                <li className="!w-full">
                  <Button
                    style={{ textTransform: "initial" }}
                    className="!text-[rgba(0,0,0,0.7)] !w-full !justify-start !text-[13px] !flex !gap-3  !pl-9 !font-[500]"
                    onClick={() => {
                      setIsOpenAddProductPanel({
                        open: true,
                        model: "Add New Sub Category",
                      });
                      closeSidebar();
                    }}
                  >
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add a Sub Category
                  </Button>
                </li>
              </ul>
            </ReactCollapse>
          </li>
          <li>
            <Link to="/orders" onClick={closeSidebar}>
              <Button className="w-full !py-3 !font-[600] !justify-start !px-6 flex  !gap-3 !text-[16px] !text-[rgba(0,0,0,0.8)] hover:!bg-[#f1f1f1]">
                <SiHackthebox className="text-[18px]" />
                <span style={{ textTransform: "initial" }}>Orders List</span>
              </Button>
            </Link>
          </li>
          <li>
            <Button className="w-full !py-3   !font-[600] !justify-start !px-6 flex  !gap-3 !text-[16px] !text-[rgba(0,0,0,0.8)] hover:!bg-[#f1f1f1]">
              <CiLogout className="text-[18px] !font-bold" />
              <span
                style={{ textTransform: "initial" }}
                onClick={() => {
                  handleLogout();
                  closeSidebar();
                }}
              >
                Logout
              </span>
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SideBar;
