import React, { useContext } from "react";
import Tooltip from "@mui/material/Tooltip";
import { LuTrash2 } from "react-icons/lu";
import { Button } from "@mui/material";
import { MyContext } from "../../App.jsx";
import { FiPlus } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

function SubCategoryList() {
  const { setIsOpenAddProductPanel } = useContext(MyContext);

  const handleDelete = () => {
    
  };

  return (
    <>
      <div className="products shadow-md  rounded-md py-2 !px-5 bg-white">
        <div className="flex justify-between pt-3 items-center">
          <h4 className="text-[20px] text-left font-[600]">
            {" "}
            Sub Category List
          </h4>
          <Button
            className="btn-blue !ml-auto"
            onClick={() =>
              setIsOpenAddProductPanel({
                open: true,
                model: "Add New Sub Category",
              })
            }
          >
            <FiPlus className="!pr-1 text-[20px]" />
            Add New Sub Category
          </Button>
        </div>
        <div className="relative pb-5 overflow-auto max-h-[550px] mt-5 ">
          <table className="w-full border border-gray-300 text-sm text-center  text-gray-500 dark:text-gray-500">
            <thead className="text-xs uppercase text-[12px] bg-gray-100 !text-[rgba(0,0,0,0.8)]">
              <tr className="border border-gray-300">
                <th scope="col" className="!px-6  border border-gray-200 py-4">
                  Category Image
                </th>
                <th scope="col" className="!px-6 border border-gray-200 py-4">
                  Category Name
                </th>
                <th scope="col" className="!px-6 border border-gray-200 py-4 whitespace-nowrap">
                  Sub Category List
                </th>
                <th scope="col" className="!px-6 border border-gray-200 py-4 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className=" border  border-gray-300 !my-2">
                <td className="px-6 border border-gray-200  !w-[15%] py-2  cursor-pointer">
                  <div className="img w-[60%] h-[60%] rounded-md !m-auto overflow-hidden">
                    <img
                      src="https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/wedding_Squircle-15-01-25.jpg"
                      alt=""
                      className="w-full "
                    />
                  </div>
                </td>
                <td className="px-6 py-2  border border-gray-200 !w-[15%] text-center text-gray-700 ">
                  Wedding Gifts
                </td>
                <td className="px-6  border border-gray-200 !w-[55%] py-2  cursor-pointer">   
                    <div className="flex flex-wrap items-center gap-2">
                    <Chip label="BirthDay Cakes" variant="outlined" onDelete={handleDelete} />
                    <Chip label="Aniversery Cakes" variant="outlined" onDelete={handleDelete} />
                    <Chip label="BirthDay Card" variant="outlined" onDelete={handleDelete} />
                    <Chip label="Flawers" variant="outlined" onDelete={handleDelete} />
                     </div> 
                </td>

                <td className="px-6 py-2 w-[15%]  border border-gray-200 cursor-pointer">
                  <Tooltip title="Edit Product">
                    <Button className="!w-[35px] rounded-full !h-[35px] !min-w-[35px] bg-[#f1f1f1]">
                      <MdOutlineEdit className="!text-[20px] text-[rgba(0,0,0,0.8)]" />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Remove Product">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1]">
                      <LuTrash2 className="text-[20px] text-[rgba(0,0,0,0.8)]" />
                    </Button>
                  </Tooltip>
                </td>
              </tr>
              <tr className=" border  border-gray-300 !my-2">
                <td className="px-6 border border-gray-200  !w-[15%] py-2  cursor-pointer">
                  <div className="img w-[60%] h-[60%] rounded-md !m-auto overflow-hidden">
                    <img
                      src="https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/wedding_Squircle-15-01-25.jpg"
                      alt=""
                      className="w-full "
                    />
                  </div>
                </td>
                <td className="px-6 py-2  border border-gray-200 !w-[15%] text-center text-gray-700 ">
                  Wedding Gifts
                </td>
                <td className="px-6  border border-gray-200 !w-[55%] py-2  cursor-pointer">   
                    <div className="flex flex-wrap items-center gap-2">
                    <Chip label="BirthDay Cakes" variant="outlined" onDelete={handleDelete} />
                    <Chip label="Aniversery Cakes" variant="outlined" onDelete={handleDelete} />
                    <Chip label="BirthDay Card" variant="outlined" onDelete={handleDelete} />
                    <Chip label="Flawers" variant="outlined" onDelete={handleDelete} />
                     </div> 
                </td>

                <td className="px-6 py-2 w-[15%]  border border-gray-200 cursor-pointer">
                  <Tooltip title="Edit Product">
                    <Button className="!w-[35px] rounded-full !h-[35px] !min-w-[35px] bg-[#f1f1f1]">
                      <MdOutlineEdit className="!text-[20px] text-[rgba(0,0,0,0.8)]" />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Remove Product">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1]">
                      <LuTrash2 className="text-[20px] text-[rgba(0,0,0,0.8)]" />
                    </Button>
                  </Tooltip>
                </td>
              </tr>
              <tr className=" border  border-gray-300 !my-2">
                <td className="px-6 border border-gray-200  !w-[15%] py-2  cursor-pointer">
                  <div className="img w-[60%] h-[60%] rounded-md !m-auto overflow-hidden">
                    <img
                      src="https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/wedding_Squircle-15-01-25.jpg"
                      alt=""
                      className="w-full "
                    />
                  </div>
                </td>
                <td className="px-6 py-2  border border-gray-200 !w-[15%] text-center text-gray-700 ">
                  Wedding Gifts
                </td>
                <td className="px-6  border border-gray-200 !w-[55%] py-2  cursor-pointer">   
                    <div className="flex flex-wrap items-center gap-2">
                    <Chip label="BirthDay Cakes" variant="outlined" onDelete={handleDelete} />
                    <Chip label="Aniversery Cakes" variant="outlined" onDelete={handleDelete} />
                    <Chip label="BirthDay Card" variant="outlined" onDelete={handleDelete} />
                    <Chip label="Flawers" variant="outlined" onDelete={handleDelete} />
                     </div> 
                </td>

                <td className="px-6 py-2 w-[15%]  border border-gray-200 cursor-pointer">
                  <Tooltip title="Edit Product">
                    <Button className="!w-[35px] rounded-full !h-[35px] !min-w-[35px] bg-[#f1f1f1]">
                      <MdOutlineEdit className="!text-[20px] text-[rgba(0,0,0,0.8)]" />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Remove Product">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1]">
                      <LuTrash2 className="text-[20px] text-[rgba(0,0,0,0.8)]" />
                    </Button>
                  </Tooltip>
                </td>
              </tr>
              <tr className=" border  border-gray-300 !my-2">
                <td className="px-6 border border-gray-200  !w-[15%] py-2  cursor-pointer">
                  <div className="img w-[60%] h-[60%] rounded-md !m-auto overflow-hidden">
                    <img
                      src="https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/wedding_Squircle-15-01-25.jpg"
                      alt=""
                      className="w-full "
                    />
                  </div>
                </td>
                <td className="px-6 py-2  border border-gray-200 !w-[15%] text-center text-gray-700 ">
                  Wedding Gifts
                </td>
                <td className="px-6  border border-gray-200 !w-[55%] py-2  cursor-pointer">   
                    <div className="flex flex-wrap items-center gap-2">
                    <Chip label="BirthDay Cakes" variant="outlined" onDelete={handleDelete} />
                    <Chip label="Aniversery Cakes" variant="outlined" onDelete={handleDelete} />
                    <Chip label="BirthDay Card" variant="outlined" onDelete={handleDelete} />
                    <Chip label="Flawers" variant="outlined" onDelete={handleDelete} />
                     </div> 
                </td>

                <td className="px-6 py-2 w-[15%]  border border-gray-200 cursor-pointer">
                  <Tooltip title="Edit Product">
                    <Button className="!w-[35px] rounded-full !h-[35px] !min-w-[35px] bg-[#f1f1f1]">
                      <MdOutlineEdit className="!text-[20px] text-[rgba(0,0,0,0.8)]" />
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

export default SubCategoryList;
