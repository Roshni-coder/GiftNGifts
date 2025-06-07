import { Button, Link } from "@mui/material";
import image from "../../assets/helloAdmin.jpg";
import { FiPlus } from "react-icons/fi";
import DashBordBox from "../../Components/DashbordBoxes/DashBordBox.jsx";
import React, { useContext, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa6";
import Badges from "../../Components/DashbordBoxes/Badges.jsx";
import { MyContext } from "../../App.jsx";
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

      <div className="w-full bg-[#e7edfd] px-4 md:px-10 py-4 flex flex-col md:flex-row items-center  md:gap-8 mt-2 justify-evenly rounded-md">
        <div className="info text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold leading-10 mb-3">
            Welcome To GiftnGifts
          </h1>
          <p className="text-sm md:text-base">
            Here's what’s happening on your store today. See the statistics at once.
          </p>
          <br />
          <Button
            className="btn-blue"
            onClick={() => setIsOpenAddProductPanel({ open: true, model: "Add Product" })}
          >
            <FiPlus className="pr-1 text-lg" />
            Add Product
          </Button>
        </div>
        <img src={image} alt="Admin Welcome" className="w-[150px] md:w-[250px]" />
      </div>

      <OrdersList/>
    </>
  );
}

export default DashBoard;