import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa6";
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
      const { data } = await axios.get("http://localhost:7000/api/seller/orders", {
        headers: { stoken },
      });
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
    <div className="orders shadow-md rounded-md py-4 !px-7 bg-white">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] pl-1 font-[600]">Recent Orders</h2>
      </div>

      <div className="relative pb-4 w-full overflow-x-auto mt-5">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs uppercase text-[12px] bg-gray-100 text-[rgba(0,0,0,0.8)]">
            <tr>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-4">Order Id</th>
              <th className="px-4 py-4">Name</th>
              <th className="px-4 py-4">Phone</th>
              <th className="px-4 py-4">Address</th>
              <th className="px-4 py-4">Pincode</th>
              <th className="px-4 py-4">Total</th>
              <th className="px-4 py-4">User ID</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <React.Fragment key={order._id}>
                <tr className="bg-white border-b text-center">
                  <td className="py-4 px-4">
                    <button
                      onClick={() => toggleOrderDetails(index)}
                      className="py-2 px-4 rounded-full hover:bg-gray-100"
                    >
                      {isOpenOrderdProduct === index ? (
                        <FaAngleUp className="text-[16px]" />
                      ) : (
                        <FaAngleDown className="text-[16px]" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-4">{order._id}</td>
                  <td className="px-4 py-4">{order.shippingAddress?.name}</td>
                  <td className="px-4 py-4">{order.shippingAddress?.phone}</td>
                  <td className="px-4 py-4 max-w-[250px]">
                    {order.shippingAddress?.address}
                  </td>
                  <td className="px-4 py-4">{order.shippingAddress?.pin}</td>
                  <td className="px-4 py-4">₹{order.totalAmount}</td>
                  <td className="px-4 py-4">{order.user}</td>
                  <td className="px-4 py-4">
                    <Badges status={order.status} />
                  </td>
                  <td className="px-4 py-4">
                    {new Date(order.placedAt).toLocaleDateString()}
                  </td>
                </tr>

                {isOpenOrderdProduct === index && (
                  <tr>
                    <td colSpan="10" className="py-2">
                      <div className="w-[90%] mx-auto mb-3">
                        <table className="w-full text-sm text-gray-500 shadow-md">
                          <thead className="bg-gray-100 text-[12px] uppercase text-[rgba(0,0,0,0.8)]">
                            <tr>
                              <th className="px-4 py-3">Product ID</th>
                              <th className="px-4 py-3">Product Title</th>
                              <th className="px-4 py-3">Price</th>
                              <th className="px-4 py-3">Quantity</th>
                              <th className="px-4 py-3">Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items?.length > 0 ? (
                              order.items.map((item) => (
                                <tr
                                  key={item._id}
                                  className="bg-white border-b text-center"
                                >
                                  <td className="px-4 py-3">{item.productId}</td>
                                  <td className="px-4 py-3">{item.name}</td>
                                  <td className="px-4 py-3">₹{item.price}</td>
                                  <td className="px-4 py-3">{item.quantity}</td>
                                  <td className="px-4 py-3">
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
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
