import React, { useContext } from "react";
import Progress from "../../Components/Progress/Progress.jsx";
import Tooltip from "@mui/material/Tooltip";
import { FaRegEye } from "react-icons/fa6";
import { LuTrash2 } from "react-icons/lu";
import { MdOutlineEdit } from "react-icons/md";
import { Button, Link } from "@mui/material";
import { FiPlus } from "react-icons/fi";
import SearchBox from "../../Components/SearchBox/SearchBox.jsx";
import {MyContext}  from "../../App.jsx"; 


import products from '../../Consene/ProductData.jsx'
function ProductList() {
  const { setIsOpenAddProductPanel } = useContext(MyContext);

  return (
    <>
      <div className="products shadow-md rounded-md py-2 !px-5 bg-white">
        <h2 className="text-[25px] py-1 text-left  font-[600]">
          Products List
        </h2>
        <div className="flex items-center py-1 justify-between ">
          <div className="col w-[80%]">
            <SearchBox />
          </div>
          <div className="col w-[15%]  pl-3">
          <Button className="btn-blue !ml-auto" onClick={() => setIsOpenAddProductPanel({open:true,model:'Add Product'})}>
              <FiPlus className="!pr-1 text-[20px]" />
              Add Product
            </Button>
          </div>
        </div>
        <div className="relative pb-5 overflow-auto max-h-[550px] mt-5 ">
          <table className="w-full text-sm  text-center  text-gray-500 dark:text-gray-500">
            <thead className="text-xs uppercase text-[12px] bg-gray-100 !text-[rgba(0,0,0,0.8)]">
              <tr>
                <th scope="col" className="!px-6 py-4">
                  Products
                </th>
                <th scope="col" className="!px-6 py-4 whitespace-nowrap">
                  Category
                </th>
                <th scope="col" className="!px-6 py-4 whitespace-nowrap">
                  Sub Category
                </th>
                <th scope="col" className="!px-6 py-4 whitespace-nowrap">
                  Price
                </th>
                <th scope="col" className="!px-6 py-4 whitespace-nowrap">
                  Rating
                </th>
                <th scope="col" className="!px-6 py-4 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
            {products.map((product, index) => (
                 <tr key={`${product.id}-${index}`} className="border-b border-gray-200">
                  <td className="px-6 py-2 cursor-pointer">
                    <Link to="" style={{ textDecoration: "none" }}>
                      <div className="flex items-center gap-4 w-[300px]">
                        <div className="img  !w-[65px] !h-[65px] rounded-md overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full"
                          />
                        </div>
                        <div className="info !w-[75%] text-left">
                          <h3 className="!font-[600] text-[13px] text-black">
                            {product.name}
                          </h3>
                          <p className="text-[13px] text-gray-600">
                            Birthday Cake
                          </p>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-2">{product.category}</td>
                  <td className="px-6 py-2">{product.subCategory}</td>
                  <td className="px-6 py-2">
                    <div className="flex items-center gap-1 flex-col">
                      <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
                        Rs.{product.oldPrice}
                      </span>
                      <span className="price text-[14px] font-[500]">
                        Rs.{product.price}
                      </span>
                    </div>
                  </td>
                  <td className="sales pl-8 py-2">
                    <div className="text-[14px] text-left">
                      <span className="font-[600]">{product.sales}</span>
                      <span className="!text-[14px]"> sale</span>
                      <Progress value={product.progress} type="warning" />
                    </div>
                  </td>
                  <td className="px-6 py-2 cursor-pointer">
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ProductList;
