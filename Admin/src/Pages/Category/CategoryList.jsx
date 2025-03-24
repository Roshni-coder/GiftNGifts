import React, { useContext } from "react";
import Tooltip from "@mui/material/Tooltip";
import { LuTrash2 } from "react-icons/lu";
import { Button} from "@mui/material";
import { MyContext } from "../../App.jsx";
import { FiPlus } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
function CategoryList() {
  const { setIsOpenAddProductPanel } = useContext(MyContext);

  return (
    <>
      <div className="products shadow-md  rounded-md py-2 !px-5 bg-white">
        <div className="flex justify-between pt-3 items-center">
          <h4 className="text-[20px] text-left font-[600]">Category List</h4>
          <Button
            className="btn-blue !ml-auto"
            onClick={() =>
              setIsOpenAddProductPanel({ open: true, model: "Add New Category" })
            }
          >
            <FiPlus className="!pr-1 text-[20px]" />
            Add New Category
          </Button>
        </div>
        <div className="relative pb-5 overflow-auto max-h-[550px] mt-5 ">
          <table className="w-full text-sm text-center  text-gray-500 dark:text-gray-500">
            <thead className="text-xs uppercase text-[12px] bg-gray-100 !text-[rgba(0,0,0,0.8)]">
              <tr>
                <th scope="col" className="!px-6 py-4">
                   Category Image
                </th>
                <th scope="col" className="!px-6 py-4">
                  Category Name
                </th>
                <th scope="col" className="!px-6 py-4 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className=" border-b  border-gray-300 !my-2">
                <td className="px-6 w-[30%] py-2  cursor-pointer">
                    <div className="img w-[30%] h-[30%] rounded-md !m-auto overflow-hidden">
                      <img
                        src="https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/wedding_Squircle-15-01-25.jpg"
                        alt=""
                        className="w-full "
                      />
                  </div>
                </td>
                <td className="px-6 py-2 w-[40%] text-center text-gray-700 ">Wedding Gifts</td>
                <td className="px-6 py-2 w-[30%]  cursor-pointer">
                  <Tooltip title="Edit Product">
                    <Button className="!w-[35px] rounded-full !h-[35px] !min-w-[35px] bg-[#f1f1f1]">
                      <MdOutlineEdit className="!text-[20px] text-[rgba(0,0,0,0.8)]" />
                    </Button>
                  </Tooltip>
                  <Tooltip title="View Product">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1]">
                      <FaRegEye className="text-[20px] text-[rgba(0,0,0,0.8)]" />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Remove Product">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1]">
                      <LuTrash2 className="text-[20px] text-[rgba(0,0,0,0.8)]" />
                    </Button>
                  </Tooltip>
                </td>
              </tr>
              <tr className=" border-b  border-gray-300 !my-2">
                <td className="px-6 w-[30%] py-2  cursor-pointer">
                    <div className="img w-[30%] h-[30%] rounded-md !m-auto overflow-hidden">
                      <img
                        src="https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/wedding_Squircle-15-01-25.jpg"
                        alt=""
                        className="w-full "
                      />
                  </div>
                </td>
                <td className="px-6 py-2 w-[40%] text-center text-gray-700 ">Wedding Gifts</td>
                <td className="px-6 py-2 w-[30%]  cursor-pointer">
                  <Tooltip title="Edit Product">
                    <Button className="!w-[35px] rounded-full !h-[35px] !min-w-[35px] bg-[#f1f1f1]">
                      <MdOutlineEdit className="!text-[20px] text-[rgba(0,0,0,0.8)]" />
                    </Button>
                  </Tooltip>
                  <Tooltip title="View Product">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1]">
                      <FaRegEye className="text-[20px] text-[rgba(0,0,0,0.8)]" />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Remove Product">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1]">
                      <LuTrash2 className="text-[20px] text-[rgba(0,0,0,0.8)]" />
                    </Button>
                  </Tooltip>
                </td>
              </tr>
              <tr className=" border-b  border-gray-300 !my-2">
                <td className="px-6 w-[30%] py-2  cursor-pointer">
                    <div className="img w-[30%] h-[30%] rounded-md !m-auto overflow-hidden">
                      <img
                        src="https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/wedding_Squircle-15-01-25.jpg"
                        alt=""
                        className="w-full "
                      />
                  </div>
                </td>
                <td className="px-6 py-2 w-[40%] text-center text-gray-700 ">Wedding Gifts</td>
                <td className="px-6 py-2 w-[30%]  cursor-pointer">
                  <Tooltip title="Edit Product">
                    <Button className="!w-[35px] rounded-full !h-[35px] !min-w-[35px] bg-[#f1f1f1]">
                      <MdOutlineEdit className="!text-[20px] text-[rgba(0,0,0,0.8)]" />
                    </Button>
                  </Tooltip>
                  <Tooltip title="View Product">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1]">
                      <FaRegEye className="text-[20px] text-[rgba(0,0,0,0.8)]" />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Remove Product">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1]">
                      <LuTrash2 className="text-[20px] text-[rgba(0,0,0,0.8)]" />
                    </Button>
                  </Tooltip>
                </td>
              </tr>
              <tr className=" border-b  border-gray-300 !my-2">
                <td className="px-6 w-[30%] py-2  cursor-pointer">
                    <div className="img w-[30%] h-[30%] rounded-md !m-auto overflow-hidden">
                      <img
                        src="https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/wedding_Squircle-15-01-25.jpg"
                        alt=""
                        className="w-full "
                      />
                  </div>
                </td>
                <td className="px-6 py-2 w-[40%] text-center text-gray-700 ">Wedding Gifts</td>
                <td className="px-6 py-2 w-[30%]  cursor-pointer">
                  <Tooltip title="Edit Product">
                    <Button className="!w-[35px] rounded-full !h-[35px] !min-w-[35px] bg-[#f1f1f1]">
                      <MdOutlineEdit className="!text-[20px] text-[rgba(0,0,0,0.8)]" />
                    </Button>
                  </Tooltip>
                  <Tooltip title="View Product">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1]">
                      <FaRegEye className="text-[20px] text-[rgba(0,0,0,0.8)]" />
                    </Button>
                  </Tooltip>
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

export default CategoryList;
