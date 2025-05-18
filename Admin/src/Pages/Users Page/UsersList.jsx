import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBox from "../../Components/SearchBox/SearchBox.jsx";

function UsersList() {
  const [users, setUsers] = useState([]);
  const stoken=localStorage.getItem('stoken')||null
  useEffect(() => {
    fetchUsers();
    console.log(users);
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:7000/api/seller/users-list",{headers:{stoken}});
      if (res.data.success) {
        setUsers(res.data.users);
      } else {
        console.log("No users found");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  return (
    <div className="products shadow-md rounded-md py-2 !px-5 bg-white">
      <div className="flex items-center pt-3 px-1 justify-between ">
        <div className="col w-[40%] ">
          <h2 className="text-[25px] py-1 text-left font-[600]">Users List</h2>
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
              <th className="!px-6 py-4 whitespace-nowrap">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-6 py-4 text-gray-700">{user.name}</td>
                  <td className="px-6 py-4 text-gray-700">{user.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="px-6 py-4 text-gray-500">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersList;