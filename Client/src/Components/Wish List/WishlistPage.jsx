import React, { useContext, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import SideMenu from "../My Profile/SideMenu.jsx";
import { AppContext } from "../context/Appcontext.jsx";

function WishlistPage() {

  const { wishlistItems, setWishlistItems, fetchWishlist } = useContext(AppContext);
  const token = localStorage.getItem("token");

  // const fetchWishlist = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:7000/api/auth/wishlist", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setWishlistItems(res.data.wishlist || []);
  //   } catch (err) {
  //     console.error("Error fetching wishlist:", err);
  //   }
  // };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`http://localhost:7000/api/auth/delete-wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlistItems((prev) =>
        prev.filter((item) => (item?.product?._id || item?._id) !== productId)
      );
    } catch (err) {
      console.error("Error removing wishlist item:", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <section className="section py-3">
      <div className="container flex gap-5">
      <div className="col1 w-[20%]">
           <SideMenu />
        </div>

        <div className="col2 w-[80%] shadow-md py-5 px-5 rounded-md bg-white">
          <h2 className="text-black text-lg font-semibold">Your Wishlist</h2>
          <p>
            You have <span className="font-bold">{wishlistItems.length}</span> items in your wishlist.
          </p>
       
        <div className="max-h-[500px] overflow-y-scroll mt-2 ">
          {wishlistItems.length > 0 ? (
            wishlistItems.map((item) => {
              const product = item.product || item;
              if (!product || !product._id) return null;

              return (
                <div key={product._id} className="wishlist-item border-b border-gray-100 py-2 flex items-center ">
                  <div className="img w-[15%] h-[20%] rounded-md overflow-hidden">
                    <Link to={`/products/${product._id}`} className="group">
                      <img
                        src={product.image || "https://via.placeholder.com/150"}
                        alt={product.title}
                        className="w-25 group-hover:scale-105 transition-all"
                      />
                    </Link>
                  </div>

                  <div className="info w-[85%] relative">
                    <IoCloseSharp
                      onClick={() => handleRemove(product._id)}
                      className="cursor-pointer absolute top-1 right-2 text-[20px]"
                    />
                    <h3 className="text-[16px] font-medium text-black">
                      <Link to={`/products/${product._id}`} className="link">
                        {product.title}
                      </Link>
                    </h3>

                    <p className="text-sm text-gray-600">
                      Brand: <span className="font-semibold">{product.brand}</span>
                    </p>

                    <div className="flex gap-4 mt-1">
                      <span className="text-black font-semibold text-[15px]">
                        ₹{product.price}
                      </span>
                      <span className="line-through text-gray-500 text-sm">
                        ₹{product.oldprice}
                      </span>
                      <span className="text-[#7d0492] font-semibold text-sm">
                        {product.discount}% off
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="p-4 text-gray-500">Your wishlist is empty.</p>
          )}
        </div>
      </div>
      </div>
    </section>
  );
}

export default WishlistPage;