import { useContext, useEffect } from "react";
import { AppContext } from "../context/Appcontext.jsx";
import CartItems from "../Cart Page/CartItems.jsx";
import Totalprice from "../Cart Page/Totalprice.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Divider } from "@mui/material";
import AddAddress from "../BillingPage/AddAddress.jsx";

function OrderSummery() {
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
  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert("No items in cart to place order.");
      return;
    }

    const token = localStorage.getItem("token");

    const items = cartItems.map((item) => ({
      productId: item.product._id, // ✅ correct key
      quantity: item.quantity,
      price: item.product.price,
    }));

    const totalAmount = cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    const Addressdata = JSON.parse(localStorage.getItem("selectedAddress"));
    const shippingAddress = {
      name: Addressdata.fullName,

      pin: Addressdata.pin,
      city: Addressdata.city,
      state: Addressdata.state,
      phone: Addressdata.phoneNumber,
      alternatephone: Addressdata.alternatephone,
      address: Addressdata.address,
    };

    try {
      console.log("items", items);
      console.log("totel amount", totalAmount);
      console.log("ship", shippingAddress);
      console.log(cartItems);
      console.log(Addressdata);
      const response = await axios.post(
        "http://localhost:7000/api/client/place-order",
        {
          items,
          totalAmount,
          shippingAddress,
        }
      );

      if (response.data.success) {
        alert("Order placed successfully!");
        navigate("/"); // Or navigate to a success page
      } else {
        alert("Order placement failed.");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Something went wrong while placing the order.");
    }
  };
  const checkoutHandler = async () => {
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  
    try {
      const { data: { key } } = await axios.get('http://localhost:7000/api/getkey');
  
      const { data: { order } } = await axios.post('http://localhost:7000/api/checkout', {
        amount: totalAmount  // Amount should be in paisa
      });
  
      const options = {
        key,
        amount: order.amount, // from server
        currency: "INR",
        name: "IshiSoft Private Limited",
        description: "Order Payment",
        order_id: order.id,
        callback_url: "http://localhost:7000/api/paymentVerification",
        prefill: {
          name: "Roshni Bhoi",
          email: "bhoiroshni847@gmail.com",
          contact: "6354948868",
        },
        notes: {
          address: "Customer Address",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error in Razorpay checkout:", error);
      alert("Payment initialization failed");
    }
  };
  
  return (
    <section className="section py-3">
      <div className="container w-[70%] lg:w-[80%] w-full lg:flex gap-4">
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
                    onClick={() => handlePlaceOrder()}
                    className="w-[30%] float-right !text-white items-center pt-2 !text-center !bg-[#fb541b] !rounded-none !h-[45px]"
                  >
                    {" "}
                    Cash On Delivery
                  </Button>
                  <Button
  onClick={checkoutHandler}
  className="w-[30%] float-right !text-white items-center pt-2 !text-center !bg-[#ff9f00] !rounded-none !h-[45px]"
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
        <div className="rightPart lg:w-[30%] w-[30%] mt-4 lg:mt-0">
          <Totalprice />
        </div>
      </div>
    </section>
  );
}

export default OrderSummery;
