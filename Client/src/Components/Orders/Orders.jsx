import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa6";
import Badges from "./Badges";
import SideMenu from "../My Profile/Sidemenu";

function Orders() {
  const [isOpenOrderdProduct, setOpenOrderdProduct] = useState(null);

  const isShowOrder = (index) => {
    if (isOpenOrderdProduct === index) {
      setOpenOrderdProduct(null);
    } else {
      setOpenOrderdProduct(index)
    }
  };
  return (
    
       <section className='py-6 w-full'>
      <div className="container flex gap-5">
        <div className="col1 w-[20%]">
        <SideMenu/>
        </div>
        
        <div className="col2 w-[80%] shadow-md py-5 px-5 rounded-md bg-white">
          <h2 className="text-black !pb-1 px-1 text-[18px]">My Orders</h2>
          <p className="mt-0 mb-0 px-1 text-[15px]">
            There Are <span className="font-bold text-[#7d0492]">2</span> orders
          </p>

          <div className="relative w-[100%] max-w-[100%] overflow-x-auto mt-5">
            <table className="w-full text-sm text-gray-500 dark:text-gray-500">
              <thead className="text-xs uppercase text-[12px] bg-gray-100 !text-[rgba(0,0,0,0.8)]">
                <tr>
                  <th scope="col" className=" py-2">
                    &nbsp;
                  </th>
                  <th scope="col" className="!px-4 py-4 whitespace-nowrap">
                    Order Id
                  </th>
                  <th scope="col" className="!px-4 py-4 whitespace-nowrap">
                    Payment Id
                  </th>
                  <th scope="col" className="!px-4 py-4 whitespace-nowrap">
                    Name
                  </th>
                  <th scope="col" className="!px-4 py-4 whitespace-nowrap">
                    Phone Number
                  </th>
                  <th scope="col" className="!px-4 py-4 whitespace-nowrap">
                    Address
                  </th>
                  <th scope="col" className="!px-2 py-4 whitespace-nowrap">
                    Pincode
                  </th>
                  <th scope="col" className="px-4 py-4 whitespace-nowrap">
                    Total Amount
                  </th>
                  <th scope="col" className="px-4 py-4 whitespace-nowrap">
                    User Id
                  </th>
                  <th scope="col" className="px-4 py-4 whitespace-nowrap">
                    Order Status
                  </th>
                  <th scope="col" className="px-4 py-4 whitespace-nowrap">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* first order */}
                <tr className="bg-white border-b text-center dark:border-gray-200">
                  <td className=" pl-2 py-4 font-[500]">
                    <button
                      className=" !py-3 px-6 flex items-center justify-center !rounded-full hover:!bg-gray-100"
                      onClick={() => isShowOrder(0)}
                    >
                      {isOpenOrderdProduct === 0 ? (
                        <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                      ) : (
                        <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-4 font-[500]">
                    <span>834532762373276</span>
                  </td>
                  <td className="px-4 py-4 font-[500]">
                    <span>pay_PTP0qEXJSCHCV</span>
                  </td>
                  <td className="px-4 py-4 font-[500] whitespace-nowrap">
                    Bhoi Roshni
                  </td>
                  <td className="px-4 py-4 font-[500] whitespace-nowrap">
                   6737846728
                  </td>
                  <td className="px-4 py-4 font-[500]">
                    <span className="block w-[270px]">
                      {" "}
                      Baji Patel Patel no vhoevad,Visnagar
                    </span>
                  </td>
                  <td className="px-4 py-4 font-[500]">373742</td>
                  <td className="px-4 py-4 font-[500]">₹2,342</td>
                  <td className="px-4 py-4 font-[500]">
                    roshuroshni264@gmail.com
                  </td>
                  <td className="px-4 py-4 font-[500]">
                    <Badges status="Delivered" />
                  </td>
                  <td className="px-4 py-4 font-[500] whitespace-nowrap">
                    2024-12-1
                  </td>
                </tr>
                {isOpenOrderdProduct === 0 && (
                  <tr>
                    <td colSpan={6}>
                      <div className=" w-[60%] ml-25 my-2 mb-2">
                        <table className="w-full   shadow-md text-sm items-center   text-gray-500 dark:text-gray-500">
                          <thead className="text-xs  uppercase text-[12px] bg-gray-100  !text-[rgba(0,0,0,0.8)]">
                            <tr>
                              <th
                                scope="col"
                                className="px-4 py-4 whitespace-nowrap"
                              >
                                Product Id
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-4 whitespace-nowrap"
                              >
                                Product Title
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-4 whitespace-nowrap"
                              >
                                Product Image
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-4 whitespace-nowrap"
                              >
                                Price
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-4 whitespace-nowrap"
                              >
                                Sub Total
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white border-b text-center dark:border-gray-200">
                              <td className="px-4 py-4 font-[500]">
                                <span>64723c782ca93</span>
                              </td>
                              <td className="px-4 py-4 font-[500] whitespace-nowrap">
                                <span>Red Velvet Fresh Cream Cake Half kg</span>
                              </td>
                              <td className="px-4 py-4 font-[500]  !m-auto ">
                                <img
                                  src="https://www.fnp.com/images/pr/l/v20221205201829/red-velvet-fresh-cream-cake-half-kg_1.jpg"
                                  alt=""
                                  className="w-[50px] m-auto rounded-md h-[50px] object-cover"
                                />
                              </td>
                              <td className="px-4 py-4 font-[500] whitespace-nowrap">
                                ₹2,000
                              </td>
                              <td className="px-4 py-4 font-[500] whitespace-nowrap">
                                ₹2,000
                              </td>
                            </tr>
                            <tr className="bg-white border-b text-center dark:border-gray-200">
                              <td className="px-4 py-4 font-[500]">
                                <span>64723c782ca93</span>
                              </td>
                              <td className="px-4 py-4 font-[500] whitespace-nowrap">
                                <span>Red Velvet Fresh Cream Cake Half kg</span>
                              </td>
                              <td className="px-4 py-4 font-[500]  !m-auto ">
                                <img
                                  src="https://www.fnp.com/images/pr/l/v20221205201829/red-velvet-fresh-cream-cake-half-kg_1.jpg"
                                  alt=""
                                  className="w-[50px] m-auto rounded-md h-[50px] object-cover"
                                />
                              </td>
                              <td className="px-4 py-4 font-[500] whitespace-nowrap">
                                ₹2,000
                              </td>
                              <td className="px-4 py-4 font-[500] whitespace-nowrap">
                                ₹2,000
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
                    
                    {/* second order */}
                 <tr className="bg-white border-b text-center dark:border-gray-200">
                  <td className="pl-2 py-4 font-[500]">
                    <button
                      className=" !py-3 !px-4 flex items-center justify-center !rounded-full hover:!bg-gray-100"
                      onClick={() => isShowOrder(1)}
                    >
                      {isOpenOrderdProduct === 1 ? (
                        <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                      ) : (
                        <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-4 font-[500]">
                    <span>834532762373276</span>
                  </td>
                  <td className="px-4 py-4 font-[500]">
                    <span>pay_PTP0qEXJSCHCV</span>
                  </td>
                  <td className="px-4 py-4 font-[500] whitespace-nowrap">
                   Dimpal Bhoi
                  </td>
                  <td className="px-4 py-4 font-[500] whitespace-nowrap">
                    7374827386
                  </td>
                  <td className="px-4 py-4 font-[500]">
                    <span className="block w-[270px]">
                      {" "}
                      Baji Patel Patel no vhoevad,Visnagar
                    </span>
                  </td>
                  <td className="px-4 py-4 font-[500]">373742</td>
                  <td className="px-4 py-4 font-[500]">₹2,342</td>
                  <td className="px-4 py-4 font-[500]">
                    roshuroshni264@gmail.com
                  </td>
                  <td className="px-4 py-4 font-[500]">
                    <Badges status="Pending" />
                  </td>
                  <td className="px-4 py-4 font-[500] whitespace-nowrap">
                    2024-12-1
                  </td>
                </tr>
                {isOpenOrderdProduct === 1 && (
                  <tr>
                    <td colSpan={6}>
                      <div className=" w-[60%] ml-25 my-2 mb-2">
                        <table className="w-full   shadow-md text-sm items-center   text-gray-500 dark:text-gray-500">
                          <thead className="text-xs  uppercase text-[12px] bg-gray-100  !text-[rgba(0,0,0,0.8)]">
                            <tr>
                              <th
                                scope="col"
                                className="px-4 py-4 whitespace-nowrap"
                              >
                                Product Id
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-4 whitespace-nowrap"
                              >
                                Product Title
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-4 whitespace-nowrap"
                              >
                                Product Image
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-4 whitespace-nowrap"
                              >
                                Price
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-4 whitespace-nowrap"
                              >
                                Sub Total
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white border-b text-center dark:border-gray-200">
                              <td className="px-4 py-4 font-[500]">
                                <span>64723c782ca93</span>
                              </td>
                              <td className="px-4 py-4 font-[500] whitespace-nowrap">
                                <span>Red Velvet Fresh Cream Cake Half kg</span>
                              </td>
                              <td className="px-4 py-4 font-[500]  !m-auto ">
                                <img
                                  src="https://www.fnp.com/images/pr/l/v20221205201829/red-velvet-fresh-cream-cake-half-kg_1.jpg"
                                  alt=""
                                  className="w-[50px] m-auto rounded-md h-[50px] object-cover"
                                />
                              </td>
                              <td className="px-4 py-4 font-[500] whitespace-nowrap">
                                ₹2,000
                              </td>
                              <td className="px-4 py-4 font-[500] whitespace-nowrap">
                                ₹2,000
                              </td>
                            </tr>
                            <tr className="bg-white border-b text-center dark:border-gray-200">
                              <td className="px-4 py-4 font-[500]">
                                <span>64723c782ca93</span>
                              </td>
                              <td className="px-4 py-4 font-[500] whitespace-nowrap">
                                <span>Red Velvet Fresh Cream Cake Half kg</span>
                              </td>
                              <td className="px-4 py-4 font-[500]  !m-auto ">
                                <img
                                  src="https://www.fnp.com/images/pr/l/v20221205201829/red-velvet-fresh-cream-cake-half-kg_1.jpg"
                                  alt=""
                                  className="w-[50px] m-auto rounded-md h-[50px] object-cover"
                                />
                              </td>
                              <td className="px-4 py-4 font-[500] whitespace-nowrap">
                                ₹2,000
                              </td>
                              <td className="px-4 py-4 font-[500] whitespace-nowrap">
                                ₹2,000
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
                  

                  {/* Third  order */}
                <tr className="bg-white border-b text-center dark:border-gray-200">
                  <td className="pl-2 py-4 font-[500]">
                    <button
                      className=" !py-3 !px-4 flex items-center justify-center !rounded-full hover:!bg-gray-100"
                      onClick={() => isShowOrder(2)}
                    >
                      {isOpenOrderdProduct === 2 ? (
                        <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                      ) : (
                        <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-4 font-[500]">
                    <span>834532762373276</span>
                  </td>
                  <td className="px-4 py-4 font-[500]">
                    <span>pay_PTP0qEXJSCHCV</span>
                  </td>
                  <td className="px-4 py-4 font-[500] whitespace-nowrap">
                   Dimpal Bhoi
                  </td>
                  <td className="px-4 py-4 font-[500] whitespace-nowrap">
                    7374827386
                  </td>
                  <td className="px-4 py-4 font-[500]">
                    <span className="block w-[270px]">
                      {" "}
                      Baji Patel Patel no vhoevad,Visnagar
                    </span>
                  </td>
                  <td className="px-4 py-4 font-[500]">373742</td>
                  <td className="px-4 py-4 font-[500]">₹2,342</td>
                  <td className="px-4 py-4 font-[500]">
                    roshuroshni264@gmail.com
                  </td>
                  <td className="px-4 py-4 font-[500]">
                    <Badges status="Pending" />
                  </td>
                  <td className="px-4 py-4 font-[500] whitespace-nowrap">
                    2024-12-1
                  </td>
                </tr>
                {isOpenOrderdProduct === 2 && (
                  <tr>
                    <td colSpan={6}>
                      <div className=" w-[60%] ml-25 my-2 mb-2">
                        <table className="w-full   shadow-md text-sm items-center   text-gray-500 dark:text-gray-500">
                          <thead className="text-xs  uppercase text-[12px] bg-gray-100  !text-[rgba(0,0,0,0.8)]">
                            <tr>
                              <th
                                scope="col"
                                className="px-4 py-4 whitespace-nowrap"
                              >
                                Product Id
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-4 whitespace-nowrap"
                              >
                                Product Title
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-4 whitespace-nowrap"
                              >
                                Product Image
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-4 whitespace-nowrap"
                              >
                                Price
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-4 whitespace-nowrap"
                              >
                                Sub Total
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white border-b text-center dark:border-gray-200">
                              <td className="px-4 py-4 font-[500]">
                                <span>64723c782ca93</span>
                              </td>
                              <td className="px-4 py-4 font-[500] whitespace-nowrap">
                                <span>Red Velvet Fresh Cream Cake Half kg</span>
                              </td>
                              <td className="px-4 py-4 font-[500]  !m-auto ">
                                <img
                                  src="https://www.fnp.com/images/pr/l/v20221205201829/red-velvet-fresh-cream-cake-half-kg_1.jpg"
                                  alt=""
                                  className="w-[50px] m-auto rounded-md h-[50px] object-cover"
                                />
                              </td>
                              <td className="px-4 py-4 font-[500] whitespace-nowrap">
                                ₹2,000
                              </td>
                              <td className="px-4 py-4 font-[500] whitespace-nowrap">
                                ₹2,000
                              </td>
                            </tr>
                            <tr className="bg-white border-b text-center dark:border-gray-200">
                              <td className="px-4 py-4 font-[500]">
                                <span>64723c782ca93</span>
                              </td>
                              <td className="px-4 py-4 font-[500] whitespace-nowrap">
                                <span>Red Velvet Fresh Cream Cake Half kg</span>
                              </td>
                              <td className="px-4 py-4 font-[500]  !m-auto ">
                                <img
                                  src="https://www.fnp.com/images/pr/l/v20221205201829/red-velvet-fresh-cream-cake-half-kg_1.jpg"
                                  alt=""
                                  className="w-[50px] m-auto rounded-md h-[50px] object-cover"
                                />
                              </td>
                              <td className="px-4 py-4 font-[500] whitespace-nowrap">
                                ₹2,000
                              </td>
                              <td className="px-4 py-4 font-[500] whitespace-nowrap">
                                ₹2,000
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Orders;