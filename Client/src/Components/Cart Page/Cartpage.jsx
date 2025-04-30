import { useContext, useEffect } from "react";
import { AppContext } from "../context/Appcontext.jsx";
import CartItems from "./CartItems";
import Totalprice from "./Totalprice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Divider } from "@mui/material";

function Cartpage() {
  const navigate = useNavigate(); // ✅ init navigate
  const { cartItems, setCartItems, fetchCart } = useContext(AppContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (cartItemId) => {
    try {
      await axios.delete(
        `http://localhost:7000/api/auth/delete/${cartItemId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCartItems((prev) =>
        prev.filter((item) => item.product._id !== cartItemId)
      );
    } catch (err) {
      console.error("Error removing cart item:", err);
    }
  };

  const handleUpdateQuantity = async (productId, newQty) => {
    try {
      await axios.put(
        "http://localhost:7000/api/auth/update-quantity",
        { productId, quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product._id === productId ? { ...item, quantity: newQty } : item
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Error updating quantity");
    }
  };

  // ✅ Handle Place Order click
  const handlePlaceOrder = () => {
    navigate("/addaddress"); // Navigate to the AddAddress page
  };

  return (
    <section className="section py-3">
      <div className="container w-[70%] lg:w-[80%] w-full  lg:flex gap-4">
        <div className="leftPart lg:w-[70%] w-full bg-white !h-[600] ">
          <div className="py-2 sm:px-3 px-2 border-b border-gray-200">
            <h2 className="text-black">Your Cart</h2>
            <p>
              There are <span className="font-bold">{cartItems.length}</span>{" "}
              products in your cart.
            </p>
          </div>
          <div className=" rounded-md bg-white shadow-m">
            <div className="max-h-[430px] overflow-y-scroll">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <CartItems
                    key={item.product._id}
                    cartItemId={item.product._id}
                    product={item.product}
                    quantity={item.quantity}
                    onRemove={handleRemove}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                ))
              ) : (
                <p className="p-4 text-gray-500">Your cart is empty.</p>
              )}
            </div>

            {cartItems.length > 0 && (
              <Button
                type="submit"
                variant="contained"
                className="!w-[40%] float-right !mx-6 !my-5 !bg-[#fb541b] !rounded-none !h-[45px]"
                onClick={handlePlaceOrder}
              >
                Continue
              </Button>
            )}
          </div>
        </div>
        <div className="rightPart lg:w-[30%] w-[30%] mt-4 lg:mt-0">
          <Totalprice handlePlaceOrder={handlePlaceOrder} />{" "}
          {/* Pass the function here */}
        </div>
      </div>
    </section>
  );
}

export default Cartpage;
