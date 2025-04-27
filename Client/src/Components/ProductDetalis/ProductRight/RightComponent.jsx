import React, { useState } from "react";
import { Button, Typography, Box, styled, useScrollTrigger } from "@mui/material";
import LocalOffer from "@mui/icons-material/LocalOffer";
import Rating from "@mui/material/Rating";
import { FaRegHeart,FaHeart } from "react-icons/fa";
import { GoGitCompare } from "react-icons/go";
import { ShoppingCart as Cart, FlashOn as Flash } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";

const SmallText = styled(Box)`
  font-size: 13px;
  vertical-align: baseline;
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

function RightComponent({ product }) {

  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistClick = async () => {
    try {
      await handleAddToWishlist(product);  // Wait for successful API call
      setIsWishlisted(true);               // Then show the red heart
    } catch (err) {
      console.error("Wishlist error:", err);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const response = await axios.post(
        'http://localhost:7000/api/auth/Cart', // replace with actual route
        {
          productId: product._id,
          quantity: 1,
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // If using JWT auth
          },
        }
      );

      if (response.data?.cart) {
        console.log("Added to cart successfully", response.data.cart);
        // Optionally show a toast or UI update
      }
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
    }
  };

  const handleAddToWishlist = async (product) => {
    try {
      const response = await axios.post(
        "http://localhost:7000/api/auth/wishlist",
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        console.log("Added to wishlist successfully:", response.data);
        // Optionally show toast / update UI
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error.response?.data || error.message);
    }
  };

  return (
    <div className="productContent ">
      <h1 className="text-[20px] font-[600] py-1">{product.title}</h1>

      <div className="flex items-center py-1 gap-3">
        <span className="text-gray-400 sm:!text-[15px] text-[12px] ">
          Brands :
          <span className="font-[400] text-[12px] sm:!text-[14px] text-gray-600  pl-1">
            {product.brand}
          </span>
        </span>
        <Rating name="size-small" defaultValue={4} size="small" readOnly />
        <span className="text-[13px] sm:!text-[14px] cursor-pointer">Review {5}</span>
      </div>

      <div className="flex items-center gap-4 py-1">
        <span className="price text-black text-[17px] font-[600]">
          ₹{product.price}
        </span>
        <span className="oldPrice line-through text-gray-500 text-[13px] sm:!text-[14px] font-[500]">
          ₹{product.oldprice}
        </span>
        <span className="price text-[#7d0492] text-[14px] font-[500]">
          {product.discount}% off
        </span>
      </div>

      <div className="offers">
        <Typography style={{ fontSize: 15 }}>Available Offers</Typography>
        <SmallText>
          <Typography>
            <StyledBedge />
            Bank Offer : 10% off up to ₹749 on HDFC Bank Credit Card Transactions. T&C
          </Typography>
          <Typography>
            <StyledBedge />
            Bank Offer : 5% off on ICICI Bank Credit Card EMI Transactions. T&C
          </Typography>
          <Typography>
            <StyledBedge />
            15% off on orders above ₹3000 (Only for new customers)
          </Typography>
        </SmallText>
      </div>
      <div className="additionalOptions mt-2 ">
        <div className="flex items-center gap-3 py-2">
          <Link
            onClick={() => handleWishlistClick(product)}
            className="text-[15px] flex items-center gap-2"
          >
            <FaRegHeart className="text-[15px] " /> Add to Wishlist
          </Link>
        </div>
      </div>
      <div className="addToCartSection py-2 flex gap-2">
        <Button className=" h-[50px] w-[300px] !bg-[#ff9f00]" variant="contained"
          onClick={() => handleAddToCart(product)}
          startIcon={<Cart />}
        >
          Add to Cart
        </Button>
        <Link to="/addaddress">
        <Button className=" h-[50px] w-[300px] !bg-[#fb541b] "
         variant="contained"
          startIcon={<Flash />}
        >
          Buy Now
        </Button>
        </Link>
      </div>
     

      {/* <div className="additionalOptions mt-4">
        <div className="flex items-center gap-3 py-2">
          <button
            onClick={handleWishlistClick()}
            className="text-[14px] flex items-center gap-2 text-gray-600 hover:text-red-500"
          >
            {isWishlisted ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart />
            )}
            {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default RightComponent;

