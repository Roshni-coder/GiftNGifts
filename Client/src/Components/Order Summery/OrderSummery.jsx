import { useContext, useEffect } from "react";
import { AppContext } from "../context/Appcontext.jsx";
import CartItems from "../Cart Page/CartItems.jsx";
import Totalprice from "../Cart Page/Totalprice.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Divider } from "@mui/material";

// Imports omitted for brevity

function OrderSummery() {
  const navigate = useNavigate();
  const { cartItems, setCartItems, fetchCart } = useContext(AppContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (cartItemId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/auth/delete/${cartItemId}`, {
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
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/update-quantity`,
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

  const buildOrderPayload = () => {
    const address = JSON.parse(localStorage.getItem("selectedAddress"));
    if (!address) {
      alert("Please select a shipping address before placing order.");
      throw new Error("Address missing");
    }

    const items = cartItems.map((item) => ({
      productId: item.product._id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    }));

    return {
      items,
      totalAmount: items.reduce((total, item) => total + item.price * item.quantity, 0),
      shippingAddress: {
        name: address.fullName,
        pin: address.pin,
        city: address.city,
        state: address.state,
        phone: address.phoneNumber,
        alternatephone: address.alternatephone,
        address: address.address,
      },
      image: cartItems[0]?.product.image || "",
    };
  };

  const handlePlaceOrder = async () => {
    if (!cartItems.length) return alert("Cart is empty.");

    let orderData;
    try {
      orderData = buildOrderPayload();
    } catch {
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/client/place-order`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) navigate("/order-success");
      else alert("Order failed.");
    } catch (error) {
      alert("Error placing order.");
    }
  };

  const checkoutHandler = async () => {
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    try {
      const { data: { key } } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getkey`);
      const { data: { order } } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout`, {
        amount: totalAmount,
      });

      const razor = new window.Razorpay({
        key,
        amount: order.amount,
        currency: "INR",
        name: "GiftnGifts",
        description: "Order Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            const orderData = { ...buildOrderPayload(), paymentId: response.razorpay_payment_id };
            const res = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/client/place-order`,
              orderData,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.success) navigate("/payment-success");
            else alert("Order save failed.");
          } catch {
            alert("Order save failed after payment.");
          }
        },
        prefill: {
          name: "Roshni Bhoi",
          email: "bhoiroshni847@gmail.com",
          contact: "6354948868",
        },
        notes: { address: "Customer Address" },
        theme: { color: "#3399cc" },
      });

      razor.open();
    } catch (error) {
      alert("Payment failed to initialize.");
    }
  };

  return (
    <section className="section py-3">
      <div className="container   !w-full lg:flex gap-4">
        <div className="leftPart lg:w-[70%] w-full">
          <div className="py-2 bg-white sm:px-3 px-2 border-b border-gray-200">
            <h2 className="text-black">Your Orders</h2>
            <p>
              There are <span className="font-bold">{cartItems.length}</span>{" "}
              products in your Orders.
            </p>
          </div>
          <div className="shadow-md rounded-md bg-white max-h-[450px] overflow-y-scroll">
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item) => (
                  <CartItems
                    key={item.product._id}
                    cartItemId={item.product._id}
                    product={item.product}
                    quantity={item.quantity}
                    onRemove={handleRemove}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                ))}
                <Divider />
                <div className="flex justify-end gap-3 m-4">
                  <Button
                    onClick={handlePlaceOrder}
                    className="w-[30%] !text-white pt-2 !bg-[#fb541b] !rounded-none !h-[45px]"
                  >
                    Cash On Delivery
                  </Button>
                  <Button
                    onClick={checkoutHandler}
                    className="w-[30%] !text-white pt-2 !bg-[#ff9f00] !rounded-none !h-[45px]"
                  >
                    Pay Now
                  </Button>
                </div>
              </>
            ) : (
              <p className="p-4 text-gray-500">Your orders list is empty.</p>
            )}
          </div>
        </div>
        <div className="rightPart lg:w-[30%] w-full mt-4 lg:mt-0">
          <Totalprice />
        </div>
      </div>
    </section>
  );
}

export default OrderSummery;

