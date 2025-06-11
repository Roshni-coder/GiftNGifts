import React, { useState, useEffect } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Badges from "./Badges";
import SideMenu from "../My Profile/SideMenu.jsx";
import axios from "axios";
// import { AppContext } from "../context/Appcontext";

function Orders() {
  // const { profile} = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [openOrderIndex, setOpenOrderIndex] = useState(null);
  const [detailedOrder, setDetailedOrder] = useState(null);

  const toggleOrder = async (index) => {
    if (openOrderIndex === index) {
      setOpenOrderIndex(null);
      setDetailedOrder(null);
    } else {
      const orderId = orders[index]._id;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/client/order/${orderId}`
        );
        if (res.data.success) {
          setDetailedOrder(res.data.order);
          setOpenOrderIndex(index);
        } else {
          alert("Failed to fetch order details.");
        }
      } catch (error) {
        console.error("Failed to fetch order details", error);
        alert("Error fetching order details.");
      }
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/client/get-orders`
        );
        if (res.data.success) {
          setOrders(res.data.orders);
        } else {
          alert("Failed to fetch orders.");
        }
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <section className="py-6 w-full ">
      <div className="container md:flex flex md:flex-row flex-col gap-3">
        <div className="col1 md:w-[20%] w-full">
          <SideMenu />
        </div>

        <div className="col2 md:w-[80%]  w-full shadow-md py-4 px-2 rounded-md bg-white">
          <h2 className="text-black !pb-1 px-1 text-[18px]">My Orders</h2>
          <p className="mt-0 mb-0 px-1 text-[15px]">
            There Are{" "}
            <span className="font-bold text-[#7d0492]">{orders.length}</span>{" "}
            orders
          </p>

          <div className="relative w-full overflow-x-auto  mt-5">
            <table className="w-full text-sm text-gray-500">
              <thead className="text-xs uppercase text-[12px] bg-gray-100 text-[rgba(0,0,0,0.8)]">
                <tr>
                  <th className="py-4">&nbsp;</th>
                  <th className="px-4 py-4">Order ID</th>
                  <th className="px-4 py-4">Name</th>
                  <th className="px-4 py-4">Phone</th>
                  <th className="px-4 py-4">City</th>
                  <th className="px-4 py-4">State</th>
                  <th className="px-4 py-4">Address</th>
                  <th className="px-4 py-4">Pincode</th>
                  <th className="px-4 py-4">Amount</th>
                  <th className="px-4 py-4">Payment Id</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <React.Fragment key={order._id}>
                    <tr className="bg-white border-b !pb-4  !border-gray-200 text-center">
                      <td className="pl-2 py-4">
                        <button
                          className="py-3 px-4 flex items-center justify-center rounded-full hover:bg-gray-100"
                          onClick={() => toggleOrder(idx)}
                        >
                          {openOrderIndex === idx ? (
                            <FaAngleUp className="text-[16px] text-gray-800" />
                          ) : (
                            <FaAngleDown className="text-[16px] text-gray-800" />
                          )}
                        </button>
                      </td>

                      <td className="px-4 py-4">{order._id}</td>
                      <td className="px-4 py-4">
                        {order.shippingAddress?.name}
                      </td>
                      <td className="px-4 py-4">
                        {order.shippingAddress?.phone}
                      </td>
                      <td className="px-4 py-4">
                        {order.shippingAddress?.city}
                      </td>
                      <td className="px-4 py-4">
                        {order.shippingAddress?.state}
                      </td>
                      <td className="px-4 py-4">
                        {order.shippingAddress?.address}
                      </td>
                      <td className="px-4 py-4">
                        {order.shippingAddress?.pin}
                      </td>
                      <td className="px-4 py-4">₹{order.totalAmount}</td>
                      <td className="px-4 py-4">{order.paymentId || "COD"}</td>

                      <td className="px-4 py-4">
                        <Badges status={order.status} />
                      </td>
                      <td className="px-4 py-4">
                        {new Date(order.placedAt).toLocaleDateString()}
                      </td>
                    </tr>

                    {openOrderIndex === idx &&
                      detailedOrder &&
                      detailedOrder._id === order._id && (
                        <tr>
                          <td colSpan={11}>
                            <div className="w-[60%] mx-25 my-2">
                              <table className="w-full shadow-md text-sm text-gray-500">
                                <thead className="text-xs uppercase bg-gray-100 text-[rgba(0,0,0,0.8)]">
                                  <tr>
                                    <th className="px-4 py-4">Image</th>
                                    <th className="px-4 py-4">Product Name</th>
                                    <th className="px-4 py-4">Quantity</th>
                                    <th className="px-4 py-4">Price</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {detailedOrder.items.map((item, index) => (
                                    <tr
                                      key={index}
                                      className="bg-white border-b border-gray-200 text-center"
                                    >
                                      <td className="px-4 py-4">
                                         {item.productId?.images?.[0]?.url ? (
                                      <img
                                        src={item.productId.images[0].url}
                                        alt="Product"
                                        className="w-12 h-12 object-cover mx-auto rounded-md"
                                      />
                                    ) : (
                                      "-"
                                    )}
                                      </td>
                                      <td className="px-4 py-4">
                                        {item.productId?.title ||
                                          item.name ||
                                          "No Title"}
                                      </td>
                                      <td className="px-4 py-4">
                                        {item.quantity}
                                      </td>
                                      <td className="px-4 py-4">
                                        ₹{item.price}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Orders;
