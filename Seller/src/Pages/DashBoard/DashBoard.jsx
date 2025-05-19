import { Button, Link } from "@mui/material";
import image from "../../assets/helloAdmin.jpg";
import { FiPlus } from "react-icons/fi";
import DashBordBox from "../../Components/DashbordBoxes/DashBordBox.jsx";
import React, { useContext, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa6";
import Badges from "../../Components/DashbordBoxes/Badges.jsx";
import {MyContext}  from "../../App.jsx";
import OrdersList from "../Orders Pages/OrdersList.jsx";
function DashBoard() {
  const { setIsOpenAddProductPanel } = useContext(MyContext);
  const [isOpenOrderdProduct, setOpenOrderdProduct] = useState(null);

  const isShowOrder = (index) => {
    if (isOpenOrderdProduct === index) {
      setOpenOrderdProduct(null);
    } else {
      setOpenOrderdProduct(index);
    }
  };
  return (
    <>
      <DashBordBox />
      <div className="!w-full !bg-[#e7edfd] !px-10 py-2  flex items-center gap-8 mt-2 justify-between rounded-md">
        <div className="info">
          <h1 className=" text-[35px] font-bold leading-10 mb-3">
            Welcome To GiftnGifts{" "}
          </h1>
          <p>
            Here's What happening on your store todyday. See the statistics at
            once.
          </p>
          <br />
          <Button className="btn-blue " onClick={() => setIsOpenAddProductPanel({open:true,model:'Add Product'})}>
            <FiPlus className="!pr-1 text-[22px]" />
            Add Product
          </Button>
        </div>
        <img src={image} alt="" className="w-[250px]" />
      </div>
     
      
     <OrdersList/>
    </>
  );
}

export default DashBoard;
