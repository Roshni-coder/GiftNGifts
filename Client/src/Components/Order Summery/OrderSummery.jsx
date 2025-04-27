import { useContext, useEffect } from "react";
import { AppContext } from "../context/Appcontext.jsx";
import CartItems from "../Cart Page/CartItems.jsx";
import Totalprice from "../Cart Page/Totalprice.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OrderSummery() {
  const navigate = useNavigate(); // ✅ init navigate
  const { cartItems, setCartItems, fetchCart } = useContext(AppContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCart();
  }, []);
  const handleRemove = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:7000/api/auth/delete/${cartItemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems((prev) => prev.filter((item) => item.product._id !== cartItemId));
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
  const handlePlaceOrder = () => {
      alert("Your order is successfully placed!");
      navigate("/"); // Navigate back to home or another page after order placement
  };

  return (
    <section className="section py-3">
      <div className="container w-[70%] lg:w-[80%] w-full lg:flex gap-4">
        <div className="leftPart lg:w-[70%] w-full">
          <div className="py-2 bg-white sm:px-3 px-2 border-b border-gray-200">
            <h2 className="text-black">Your Orders</h2>
            <p>
              There are <span className="font-bold">{cartItems.length}</span> products in your Orders.
            </p>
          </div>
          <div className="shadow-md rounded-md bg-white max-h-[450px] overflow-y-scroll">
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
              <p className="p-4 text-gray-500">Your orders list is empty.</p>
            )}
          </div>
        </div>
        <div className="rightPart lg:w-[30%] w-[30%] mt-4 lg:mt-0">
        <Totalprice handlePlaceOrder={handlePlaceOrder} />
        </div>
      </div>
    </section>
  );
}

export default OrderSummery;
