import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { IoCloseSharp } from "react-icons/io5";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { Link } from "react-router-dom";

function CategoryPanel(props) {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const [InnersubmenuIndex, setInnerSubmenuIndex] = useState(null);

  const toggleDrawer = (newOpen) => () => {
    props.setisOpenCategoryPanel(newOpen);
  };

  const openSubmenu = (index) => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else {
      setSubmenuIndex(index);
    }
  };
  const openInnerSubmenu = (index) => {
    if (InnersubmenuIndex === index) {
      setInnerSubmenuIndex(null);
    } else {
      setInnerSubmenuIndex(index);
    }
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="categoryPanel">
      <h3 className="p-3 text-[16px] font-[500] flex items-center justify-between">
        Giftshop by Category
        <IoCloseSharp
          className=" cursor-pointer text-[20px]"
          onClick={toggleDrawer(false)}
        />
      </h3>

      <Divider />

      <div className="scroll">
        <ul className="w-full">
          <li className="list-none flex items-center relative w-full flex-col">
            <Link to="/" className="w-full">
              <Button
                className="w-full !text-left !justify-start !text-[rgba(0,0,0,0.8)]"
                style={{ textTransform: "none", fontWeight: 600 }}
              >
                fashion
              </Button>
            </Link>

            {submenuIndex === 0 ? (
              <CiSquareMinus
                className="absolute !top-[10px] !right-[15px] !font-[600] cursor-pointer"
                onClick={() => openSubmenu(0)}
              />
            ) : (
              <CiSquarePlus
                className="absolute !top-[10px] !right-[15px] !font-[600] cursor-pointer"
                onClick={() => openSubmenu(0)}
              />
            )}

            {submenuIndex === 0 && (
              <ul className="submenu w-full pl-3 ">
                <li className="list-none relative ">
                  <Link to="/">
                    <Button
                      className="w-full !text-left !justify-start  !text-[rgba(0,0,0,0.8)]"
                      style={{ textTransform: "none", fontWeight: 600 }}
                    >
                      Apparel
                    </Button>
                  </Link>
                  {InnersubmenuIndex === 0 ? (
                    <CiSquareMinus
                      className="absolute !top-[10px] !right-[15px] !font-[600] cursor-pointer"
                      onClick={() => openInnerSubmenu(0)}
                    />
                  ) : (
                    <CiSquarePlus
                      className="absolute !top-[10px] !right-[15px] !font-[600] cursor-pointer"
                      onClick={() => openInnerSubmenu(0)}
                    />
                  )}

                  {InnersubmenuIndex === 0 && (
                    <ul className="inner-submenu w-full pl-3 ">
                      <li className="list-none relative m-1">
                        <Link
                          to="/"
                          className="link w-full !text-left !justify-start  !text-[rgba(0,0,0,0.8)] transition text-[14px] "
                          style={{ textTransform: "none" }}
                        >
                          Smart Watch
                        </Link>
                      </li>
                      <li className="list-none relative m-1">
                        <Link
                          to="/"
                          className="link w-full !text-left !justify-start  !text-[rgba(0,0,0,0.8)] transition text-[14px] "
                          style={{ textTransform: "none" }}
                        >
                          Smart Phone
                        </Link>
                      </li>
                      <li className="list-none relative m-1">
                        <Link
                          to="/"
                          className="link w-full !text-left !justify-start  !text-[rgba(0,0,0,0.8)] transition text-[14px] "
                          style={{ textTransform: "none" }}
                        >
                          Leather watch
                        </Link>
                      </li>
                      <li className="list-none relative m-1">
                        <Link
                          to="/"
                          className="link w-full !text-left !justify-start  !text-[rgba(0,0,0,0.8)] transition text-[14px] "
                          style={{ textTransform: "none" }}
                        >
                          Rolling Diamond
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>
          <li className="list-none flex items-center relative w-full flex-col">
            <Link to="/" className="w-full">
              <Button
                className="w-full !text-left !justify-start !text-[rgba(0,0,0,0.8)]"
                style={{ textTransform: "none", fontWeight: 600 }}
              >
                fashion
              </Button>
            </Link>

            {submenuIndex === 1 ? (
              <CiSquareMinus
                className="absolute !top-[10px] !right-[15px] !font-[600] cursor-pointer"
                onClick={() => openSubmenu(1)}
              />
            ) : (
              <CiSquarePlus
                className="absolute !top-[10px] !right-[15px] !font-[600] cursor-pointer"
                onClick={() => openSubmenu(1)}
              />
            )}

            {submenuIndex === 1 && (
              <ul className="submenu w-full pl-3 ">
                <li className="list-none relative ">
                  <Link to="/">
                    <Button
                      className="w-full !text-left !justify-start  !text-[rgba(0,0,0,0.8)]"
                      style={{ textTransform: "none", fontWeight: 600 }}
                    >
                      Apparel
                    </Button>
                  </Link>
                  {InnersubmenuIndex === 1 ? (
                    <CiSquareMinus
                      className="absolute !top-[10px] !right-[15px] !font-[600] cursor-pointer"
                      onClick={() => openInnerSubmenu(1)}
                    />
                  ) : (
                    <CiSquarePlus
                      className="absolute !top-[10px] !right-[15px] !font-[600] cursor-pointer"
                      onClick={() => openInnerSubmenu(1)}
                    />
                  )}

                  {InnersubmenuIndex === 1 && (
                    <ul className="inner-submenu w-full pl-3 ">
                      <li className="list-none relative m-1">
                        <Link
                          to="/"
                          className="link w-full !text-left !justify-start  !text-[rgba(0,0,0,0.8)] transition text-[14px] "
                          style={{ textTransform: "none" }}
                        >
                          Smart Watch
                        </Link>
                      </li>
                      <li className="list-none relative m-1">
                        <Link
                          to="/"
                          className="link w-full !text-left !justify-start  !text-[rgba(0,0,0,0.8)] transition text-[14px] "
                          style={{ textTransform: "none" }}
                        >
                          Smart Phone
                        </Link>
                      </li>
                      <li className="list-none relative m-1">
                        <Link
                          to="/"
                          className="link w-full !text-left !justify-start  !text-[rgba(0,0,0,0.8)] transition text-[14px] "
                          style={{ textTransform: "none" }}
                        >
                          Leather watch
                        </Link>
                      </li>
                      <li className="list-none relative m-1">
                        <Link
                          to="/"
                          className="link w-full !text-left !justify-start  !text-[rgba(0,0,0,0.8)] transition text-[14px] "
                          style={{ textTransform: "none" }}
                        >
                          Rolling Diamond
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </Box>
  );
  return (
    <div>
      <Drawer open={props.isOpenCatPanel} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default CategoryPanel;
