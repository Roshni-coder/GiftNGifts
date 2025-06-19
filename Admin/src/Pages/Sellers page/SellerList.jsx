import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBox from '../../Components/SearchBox/SearchBox.jsx'; // Assuming you have this component

function SellerList() {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const res = await axios.get('http://localhost:7000/api/seller/all');
        if (res.data.success) {
          setSellers(res.data.sellers);
        } else {
          console.error("Failed to fetch sellers");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchSellers();
  }, []);

  return (
    <div className="products shadow-md rounded-md py-2 !px-5 bg-white">
      <div className="flex items-center pt-3 px-1 justify-between">
        <div className="col w-[40%]">
          <h2 className="text-[25px] py-1 text-left font-[600]">Sellers List</h2>
        </div>
        <div className="col w-[60%]">
          <SearchBox />
        </div>
      </div>

      <div className="relative pb-5 overflow-auto max-h-[550px] mt-5">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-500">
          <thead className="text-xs uppercase text-[12px] bg-gray-100 !text-[rgba(0,0,0,0.8)]">
            <tr>
              <th className="!px-6 py-4">Full Name</th>
              <th className="!px-6 py-4">Email</th>
              <th className="!px-6 py-4">Phone</th>
            </tr>
          </thead>
          <tbody>
            {sellers.length > 0 ? (
              sellers.map((seller, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-6 py-4 text-gray-700">{seller.name}</td>
                  <td className="px-6 py-4 text-gray-700">{seller.email}</td>
                  <td className="px-6 py-4 text-gray-700">{seller.phone || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-gray-500">No sellers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SellerList;
