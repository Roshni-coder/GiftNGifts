import React, { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Badges from "../../Components/DashbordBoxes/Badges.jsx";
import axios from "axios";

function OrdersList() {
  const [isOpenOrderdProduct, setOpenOrderdProduct] = useState(null);
  const [orders, setOrders] = useState([]);
  const stoken = localStorage.getItem("stoken");

  const toggleOrderDetails = (index) => {
    setOpenOrderdProduct(isOpenOrderdProduct === index ? null : index);
  };

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/seller/orders`,
        {
          headers: { stoken },
        }
      );
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="orders my-3 shadow-md rounded-md py-4 px-4 bg-white max-w-full">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-[18px] font-semibold">Recent Orders</h2>
      </div>

      {/* Outer scroll container for the table */}
      <div className="relative mt-5 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 max-w-full">
        <table className="w-full min-w-[900px] text-sm text-gray-500 border-collapse">
          <thead className="text-xs uppercase text-[12px] bg-gray-100 text-[rgba(0,0,0,0.8)]">
            <tr>
              <th className="px-3 py-3 w-[30px]"></th>
              <th className="px-4 py-3 min-w-[130px]">Order Id</th>
              <th className="px-4 py-3 min-w-[100px]">Name</th>
              <th className="px-4 py-3 min-w-[100px]">Phone</th>
              <th className="px-4 py-3 min-w-[150px] max-w-[250px]">Address</th>
              <th className="px-4 py-3 min-w-[90px]">Pincode</th>
              <th className="px-4 py-3 min-w-[80px]">Total</th>
              <th className="px-4 py-3 min-w-[120px]">User ID</th>
              <th className="px-4 py-3 min-w-[130px]">Payment ID</th>
              <th className="px-4 py-3 min-w-[90px]">Status</th>
              <th className="px-4 py-3 min-w-[110px]">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <React.Fragment key={order._id}>
                <tr className="bg-white text-[13px] border-b text-center">
                  <td className="py-3 px-3">
                    <button
                      onClick={() => toggleOrderDetails(index)}
                      className="py-2 px-3 rounded-full hover:bg-gray-100"
                      aria-label={`Toggle order details for order ${order._id}`}
                    >
                      {isOpenOrderdProduct === index ? (
                        <FaAngleUp className="text-[16px]" />
                      ) : (
                        <FaAngleDown className="text-[16px]" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3 break-words max-w-[130px]">{order._id}</td>
                  <td className="px-4 py-3">{order.shippingAddress?.name}</td>
                  <td className="px-4 py-3">{order.shippingAddress?.phone}</td>
                  <td
                    className="px-4 py-3 max-w-[250px] truncate"
                    title={order.shippingAddress?.address}
                  >
                    {order.shippingAddress?.address}
                  </td>
                  <td className="px-4 py-3">{order.shippingAddress?.pin}</td>
                  <td className="px-4 py-3">₹{order.totalAmount}</td>
                  <td className="px-4 py-3 break-words max-w-[120px]">{order.user}</td>
                  <td className="px-4 py-3 break-words max-w-[130px]">
                    {order.paymentId || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <Badges status={order.status} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {new Date(order.placedAt).toLocaleDateString()}
                  </td>
                </tr>

                {isOpenOrderdProduct === index && (
                  <tr>
                    <td colSpan="11" className="py-2 px-3 bg-gray-50">
                      {/* Inner scroll container for the product details table */}
                      <div className="w-full max-w-[90vw] overflow-x-auto mx-auto mb-3 rounded-md border border-gray-200">
                        <table className="w-full min-w-[600px] text-sm text-gray-500 shadow-md border-collapse">
                          <thead className="bg-gray-100 text-[12px] uppercase text-[rgba(0,0,0,0.8)]">
                            <tr>
                              <th className="px-4 py-3 min-w-[90px]">Product ID</th>
                              <th className="px-4 py-3 min-w-[60px]">Image</th>
                              <th className="px-4 py-3 min-w-[150px]">Product Title</th>
                              <th className="px-4 py-3 min-w-[80px]">Price</th>
                              <th className="px-4 py-3 min-w-[70px]">Quantity</th>
                              <th className="px-4 py-3 min-w-[100px]">Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items?.length > 0 ? (
                              order.items.map((item) => (
                                <tr
                                  key={item._id}
                                  className="bg-white border-b text-center"
                                >
                                  <td className="px-4 py-3 break-words max-w-[90px]">
                                    {item.productId?._id || item.productId}
                                  </td>
                                  <td className="px-4 py-3">
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
                                  <td
                                    className="px-4 py-3 max-w-[150px] truncate"
                                    title={item.productId?.title || ""}
                                  >
                                    {item.productId?.title || "-"}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap">₹{item.price}</td>
                                  <td className="px-4 py-3 whitespace-nowrap">{item.quantity}</td>
                                  <td className="px-4 py-3 whitespace-nowrap">
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  colSpan="6"
                                  className="text-center py-4 text-gray-500"
                                >
                                  No items in this order.
                                </td>
                              </tr>
                            )}
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
  );
}

export default OrdersList;
