import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Typography,
  Box,
  styled,
} from "@mui/material";
import LocalOffer from "@mui/icons-material/LocalOffer";
import Rating from "@mui/material/Rating";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { ShoppingCart as Cart, FlashOn as Flash } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/Appcontext";
import { toast } from "react-toastify";

const SmallText = styled(Box)`
  font-size: 13px;
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
  const navigate = useNavigate();
  const { isLoggedin, fetchWishlist, wishlistItems } = useContext(AppContext);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const inWishlist = wishlistItems?.some((item) => item._id === product._id);
    setIsWishlisted(inWishlist);
  }, [wishlistItems, product._id]);

  const handleToggleWishlist = async () => {
    if (!isLoggedin) {
      toast.warning("Please login first to use wishlist");
      return;
    }

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/auth/wishlist`;
      const method = isWishlisted ? "delete" : "post";
      const data = { productId: product._id };

      setIsWishlisted((prev) => !prev); // Immediate visual update

      const response = await axios({
        method,
        url,
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        toast.success(
          isWishlisted ? "Removed from wishlist" : "Added to wishlist"
        );
        fetchWishlist(); // Update global state
      }
      
    } catch (error) {
      console.error("Wishlist error:", error.response?.data || error.message);
      setIsWishlisted((prev) => !prev); // Revert visual update on error
    }
  };

  const handleAddToCart = async () => {
    if (!isLoggedin) {
      toast.warning("Please login first to add products to cart");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/Cart`,
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data?.cart) {
        toast.success("Added to cart");
        navigate("/cartlist");
      }
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
    }
  };

  return (
    <div className="productContent">
      <h1 className="text-[20px] font-[600] py-1">{product.title}</h1>

      <div className="flex items-center py-1 gap-3">
        <span className="text-gray-400 sm:text-[15px] text-[12px]">
          Brands:
          <span className="font-[400] text-[12px] sm:text-[14px] text-gray-600 pl-1">
            {product.brand}
          </span>
        </span>
        <Rating name="size-small" defaultValue={4} size="small" readOnly />
        <span className="text-[13px] sm:text-[14px] cursor-pointer">Review {5}</span>
      </div>

      <div className="flex items-center gap-4 py-1">
        <span className="text-black text-[17px] font-[600]">₹{product.price}</span>
        <span className="line-through text-gray-500 text-[13px] sm:text-[14px] font-[500]">
          ₹{product.oldprice}
        </span>
        <span className="text-[#7d0492] text-[14px] font-[500]">
          {product.discount}% off
        </span>
      </div>

      <div className="offers">
        <Typography style={{ fontSize: 15 }}>Available Offers</Typography>
        <SmallText>
          <Typography><StyledBedge /> Bank Offer: 10% off up to ₹749 on HDFC Credit Cards</Typography>
          <Typography><StyledBedge /> Bank Offer: 5% off on ICICI EMI Transactions</Typography>
          <Typography><StyledBedge /> 15% off on orders above ₹3000</Typography>
        </SmallText>
      </div>

      <div className="additionalOptions  mt-2">
        <div className="flex">
          <button
            onClick={handleToggleWishlist}
            className="text-[15px] flex items-center "
          >
            {isWishlisted ? (
              <p className="flex gap-2 items-center">
                <FaHeart className="text-[20px] text-red-500" />
                <span className="!text-black">Wishlisted</span>
              </p>
            ) : (
              <p className="flex gap-2 items-center">
                <FaRegHeart className="text-[20px] text-black" />
                <span className="!text-black">Add to Wishlist</span>
              </p>
            )}
          </button>
        </div>
      </div>

      <div className="addToCartSection py-2 flex gap-2">
        <Button
          className="h-[50px] !w-[200px] sm:!w-[300px] !bg-[#ff9f00]"
          variant="contained"
          onClick={handleAddToCart}
          startIcon={<Cart />}
        >
          Add to Cart
        </Button>
        <Link to="/addaddress">
          <Button
            className="h-[50px] !w-[200px] sm:!w-[300px] !bg-[#fb541b]"
            variant="contained"
            startIcon={<Flash />}
          >
            Buy Now
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default RightComponent;
