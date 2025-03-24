import React from "react";
import Rating from "@mui/material/Rating";
import { Typography, Box, styled, Button } from "@mui/material";
import LocalOffer from "@mui/icons-material/LocalOffer";
import { FaRegHeart } from "react-icons/fa";
import { GoGitCompare } from "react-icons/go";
import {Link} from 'react-router-dom'
import { ShoppingCart as Cart, FlashOn as Flash } from "@mui/icons-material";
const SmallText = styled(Box)`
  font-size: 13px;
  vartical-align: baseline;
  & > p {
    font-size: 13px;
    margin-top: 5px;
  }
`;

const StyledBedge = styled(LocalOffer)`
  margin-right: 10px;
  color: #00cc00;
  font-size: 11px;
`;
function RightComponent() {
  return (
    <>
    <div className="productContent my-4 ">
      <h1 className="text-[20px] font-[600] py-1 ">
        Red Velvet Fresh Cream Cake Half kg
      </h1>

      <div className="flex items-center py-1 gap-3">
        <span className="text-gray-400 sm:!text-[15px] text-[12px] ">
          Brands :
          <span className="font-[400] text-[12px]  sm:!text-[14px] text-gray-600  pl-1">
            BirthDay Cake
          </span>
        </span>
        <Rating name="sixe-small" defaultValue={4} sixe="small" readOnly  />
        <span className="text-[13px] sm:!text-[14px] cursor-pointer">Review {5}</span>
      </div>

      <div className="flex items-center gap-4 py-1">
            <span className="price text-black text-[17px] font-[600]">
              ₹900
            </span>
            <span className="oldPricce line-through text-grat-500 text-[13px] sm:!text-[14px] font-[500]">
              ₹1500
            </span>
            <span className="price text-[#7d0492] text-[14px] font-[500]">
              20% off
            </span>
          </div>

      <div className="offers ">
        <Typography style={{fontSize:15}}>Available Offers</Typography>
        <SmallText>
          <Typography>
            <StyledBedge />
            Bank Offer : 10% off up to ₹749 on HDFC Bank Credit Card
            Transactions.T&C
          </Typography>
          <Typography>
            <StyledBedge />
            Bank Offer : 5% Unlimited Cashback on Flipkart Axis Bank Credit
            CardT&C
          </Typography>
          <Typography>
            <StyledBedge />
            Bank Offer : 10% off up to ₹1,250 on HDFC Bank Credit Card
            Transactions. Min Txn Value: ₹7,499T&C
          </Typography>
          <Typography>
            <StyledBedge />
            Special Price : Get extra 88% off (price inclusive of
            cashback/coupon)T&C
          </Typography>
        </SmallText>
      </div>
       <div className="flex gap-4  items-center mt-4 mb-1">
          <span className="flex items-center gap-2 text-[14px] link cursor-pointer font-[500]">
          <FaRegHeart className="text-[16px] "/> Add to WhishList
          </span>
          <span className="flex items-center gap-2 text-[14px] link cursor-pointer font-[500]">
          <GoGitCompare className="text-[18px] "/> Add to Compare
          </span>
        </div>
        <div className="btns flex mt-4 justify-start gap-3 items-center lg:mr-5">
          <Link to='/cartlist'>
            <Button className=" h-[50px] w-[300px] !bg-[#ff9f00]" variant="contained">
              <Cart />
              Add to Cart
            </Button>
            </Link>
           <Link to='/checkout'>
            <Button className="!bg-[#fb541b]  h-[50px] w-[300px]  " variant="contained">
              <Flash />
              Buy Now
            </Button>
            </Link>
           
            
            </div>
    </div>
    </>
   
  );
}

export default RightComponent;
