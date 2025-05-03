import React, { useContext } from "react";
import Tooltip from "@mui/material/Tooltip";
import { LuTrash2 } from "react-icons/lu";
import { Button, Link } from "@mui/material";
import { MyContext } from "../../App.jsx";
import { FiPlus } from "react-icons/fi";
function HomeSliderBaneerList() {
  const { setIsOpenAddProductPanel } = useContext(MyContext);

  return (
    <>
      <div className="products shadow-md  rounded-md py-2 !px-5 bg-white">
        <div className="flex justify-between pt-3 items-center">
        <h4 className="text-[20px] text-left font-[600]">
          Home Slider Banners
        </h4>
        <Button
          className="btn-blue !ml-auto"
          onClick={() =>
            setIsOpenAddProductPanel({ open: true, model: "Add Home Slide" })
          }
        >
          <FiPlus className="!pr-1 text-[20px]" />
          Add Home Slide
        </Button>
        </div>
        <div className="relative pb-5 overflow-auto max-h-[550px] mt-5 ">
          <table className="w-full text-sm text-center  text-gray-500 dark:text-gray-500">
            <thead className="text-xs uppercase text-[12px] bg-gray-100 !text-[rgba(0,0,0,0.8)]">
              <tr>
                <th scope="col" className="!px-6 py-4">
                  Products
                </th>
                <th scope="col" className="!px-6 py-4 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className=" border-b border-gray-300 !py-2 ">
                <td className="px-6  !w-[50%] py-2 cursor-pointer">
                  <Link to="" style={{ textDecoration: "none" }}>
                    <div className="img  !w-[80%] !h-[80%] !m-auto rounded-md overflow-hidden">
                      <img
                        src="https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Wedding_Desk-15-01-2025.jpg"
                        alt=""
                        className="w-full"
                      />
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-2 w-[50%]   cursor-pointer">
                  <Tooltip title="Remove Product">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1]">
                      <LuTrash2 className="text-[20px] text-[rgba(0,0,0,0.8)]" />
                    </Button>
                  </Tooltip>
                </td>
              </tr>
              <tr className=" border-b border-gray-300 !my-2">
                <td className="px-6 !w-[50%] py-2 cursor-pointer">
                  <Link to="" style={{ textDecoration: "none" }}>
                    <div className="img  !w-[80%] !h-[80%] !m-auto rounded-md overflow-hidden">
                      <img
                        src="https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Wedding_Desk-15-01-2025.jpg"
                        alt=""
                        className="w-full"
                      />
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-2 w-[50%] cursor-pointer">
                  <Tooltip title="Remove Product">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1]">
                      <LuTrash2 className="text-[20px] text-[rgba(0,0,0,0.8)]" />
                    </Button>
                  </Tooltip>
                </td>
              </tr>
              <tr className=" border-b border-gray-300 !my-2">
                <td className="px-6 !w-[50%] py-2 cursor-pointer">
                  <Link to="" style={{ textDecoration: "none" }}>
                    <div className="img  !w-[80%] !h-[80%] !m-auto rounded-md overflow-hidden">
                      <img
                        src="https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Wedding_Desk-15-01-2025.jpg"
                        alt=""
                        className="w-full"
                      />
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-2 w-[50%] cursor-pointer">
                  <Tooltip title="Remove Product">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1]">
                      <LuTrash2 className="text-[20px] text-[rgba(0,0,0,0.8)]" />
                    </Button>
                  </Tooltip>
                </td>
              </tr>
              <tr className=" border-b border-gray-300 !my-2">
                <td className="px-6 !w-[50%] py-2 cursor-pointer">
                  <Link to="" style={{ textDecoration: "none" }}>
                    <div className="img  !w-[80%] !h-[80%] !m-auto rounded-md overflow-hidden">
                      <img
                        src="https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Wedding_Desk-15-01-2025.jpg"
                        alt=""
                        className="w-full"
                      />
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-2 w-[50%] cursor-pointer">
                  <Tooltip title="Remove Product">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1]">
                      <LuTrash2 className="text-[20px] text-[rgba(0,0,0,0.8)]" />
                    </Button>
                  </Tooltip>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default HomeSliderBaneerList;
