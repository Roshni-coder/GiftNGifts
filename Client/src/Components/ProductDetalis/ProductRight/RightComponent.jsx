import React, { useContext, useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { ShoppingCart as Cart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/Appcontext";
import { toast } from "react-toastify";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { PiLineVerticalBold } from "react-icons/pi";

const RightComponent = ({ product }) => {
  const navigate = useNavigate();
  const { isLoggedin, fetchWishlist, wishlistItems } = useContext(AppContext);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    const inWishlist = wishlistItems?.some((item) => item._id === product._id);
    setIsWishlisted(inWishlist);
  }, [wishlistItems, product._id]);

  const handleToggleWishlist = async () => {
    if (!isLoggedin) {
      toast.warning("Please login to manage your wishlist");
      return;
    }

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/auth/wishlist`;
      const method = isWishlisted ? "delete" : "post";
      const data = { productId: product._id };

      setIsWishlisted((prev) => !prev); // Optimistic update

      const response = await axios({
        method,
        url,
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
        fetchWishlist();
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      setIsWishlisted((prev) => !prev); // Revert on error
    }
  };

  const handleAddToCart = async () => {
    if (!isLoggedin) {
      toast.warning("Please login to add products to cart");
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
      console.error("Add to cart error:", error);
    }
  };

  return (
    <div className="bg-white p-2 px-4 rounded-lg space-y-4">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>

      {/* Brand, Rating, Reviews */}
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <span>
          Brand: <strong>{product.brand}</strong>
        </span>
        <span className="text-yellow-500">★★★★☆</span>
        <span className="text-green-600 cursor-pointer font-medium">5 Reviews</span>
      </div>

      {/* Price Info */}
      <div className="flex items-center gap-3 text-base">
        <span className="text-lg font-semibold text-primary">₹{product.price}</span>
        <span className="line-through text-gray-400">₹{product.oldprice}</span>
        <span className="text-green-600 text-sm">{product.discount}% OFF</span>
      </div>

      {/* Pincode */}
      <div className="space-y-2">
        <p className="font-medium">Check Delivery Availability</p>
        <div className="flex items-center border rounded overflow-hidden w-[50%]">
          <span className="px-3 text-black font-[600] text-[17px]">INR  </span>
          <span> <PiLineVerticalBold/></span>
          <input
            type="text"
            className="flex-1 px-3 !py-3 text-[16px] focus:outline-none"
            placeholder="Enter Pincode"
            value={pincode}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d{0,6}$/.test(val)) setPincode(val);
            }}
          />
        </div>
        {pincode && (
          <p className="text-green-600 text-sm">
            Delivery available to {pincode}
          </p>
        )}
      </div>

      {/* Offers */}
      <div>
        <h4 className="text-md font-semibold mb-2">Available Offers</h4>
        <ul className="space-y-1 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <LocalOfferIcon className="text-green-600 mt-[2px]" fontSize="small" />
            10% off up to ₹749 on HDFC Credit Cards
          </li>
          <li className="flex items-start gap-2">
            <LocalOfferIcon className="text-green-600 mt-[2px]" fontSize="small" />
            5% off on ICICI EMI Transactions
          </li>
          <li className="flex items-start gap-2">
            <LocalOfferIcon className="text-green-600 mt-[2px]" fontSize="small" />
            15% off on orders above ₹3000
          </li>
        </ul>
      </div>

      {/* Wishlist Button */}
      <div className="flex">
        {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="w-full flex items-center justify-center gap-2 !bg-[#fb541b] !py-3  hover:bg-yellow-600 text-white font-semibold rounded transition"
      >
        <Cart fontSize="small" />
        Add to Cart
      </button>
      <button
        onClick={handleToggleWishlist}
        className={`w-full flex items-center bg-yellow-500  justify-center gap-2 rounded py-2 font-semibold transition-all ${
          isWishlisted
            ? "text-red-600 "
            : "!text-white "
        }`}
      >
        {isWishlisted ? <FaHeart className="text-[18px]"/> : <FaRegHeart className="text-[18px]"/>}
        {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
      </button>
      
      </div>
    </div>
  );
};

export default RightComponent;
