import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import Totalprice from '../Cart Page/Totalprice.jsx'
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function AddAddress() {
  const navigate = useNavigate(); // ✅ init navigate
  const [profile, setProfile] = useState({ name: '', phone: '', email: '' });
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    pin: '',
    country: '',
    isDefaultBilling: false,
  });
  const [editAddressId, setEditAddressId] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const token = localStorage.getItem('token');

  const getProfile = async () => {
    try {
      const { data } = await axios.get('http://localhost:7000/api/user/profile', {
        headers: { token },
      });
      if (data.success) {
        setProfile(data.profile);
        setAddresses(data.profile.addresses || []);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  
  const handleAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check for duplicate (excluding the one being edited)
    const isDuplicate = addresses.some((addr) => {
      return (
        addr.fullName === newAddress.fullName &&
        addr.phoneNumber === newAddress.phoneNumber &&
        addr.address === newAddress.address &&
        addr.city === newAddress.city &&
        addr.state === newAddress.state &&
        addr.pin === newAddress.pin &&
        addr.country === newAddress.country &&
        addr._id !== editAddressId // allow editing same address
      );
    });
  
    if (isDuplicate) {
      alert("This address already exists.");
      return;
    }
  
    if (editAddressId) {
      // Edit mode
      try {
        const { data } = await axios.put(
          `http://localhost:7000/api/user/updateaddress/${editAddressId}`,
          {
            userId: profile.user || profile._id,
            address: newAddress,
          },
          { headers: { token } }
        );
  
        if (data.success) {
          alert("Address updated successfully");
          resetForm();
          getProfile();
        }
      } catch (err) {
        console.error('Update address error:', err?.response?.data || err.message);
      }
    } else {
      // Add mode
      try {
        const { data } = await axios.post(
          'http://localhost:7000/api/user/addaddress',
          { address: newAddress },
          { headers: { token } }
        );
        if (data.success) {
          alert("Address added successfully");
          resetForm();
          getProfile();
        }
      } catch (err) {
        console.error('Add address error:', err?.response?.data || err.message);
      }
    }
  };
  

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;

    try {
      const { data } = await axios.delete(`http://localhost:7000/api/user/deleteaddress/${addressId}`,
        {
          data: { userId: profile.user || profile._id },
          headers: { token },
        }
      );

      if (data.success) {
        alert(data.message);
        getProfile();
      }
    } catch (error) {
      console.error("Delete address error:", error?.response?.data || error.message);
      alert("Failed to delete address.");
    }
  };

  const handleSetDefaultBilling = async (addressId) => {
    try {
      const { data } = await axios.put(`http://localhost:7000/api/user/setdefaultbilling/${addressId}`,
        { userId: profile.user || profile._id },
        { headers: { token } }
      );

      if (data.success) {
        alert("Default billing address updated!");
        getProfile();
      }
    } catch (err) {
      console.error("Set default billing error:", err?.response?.data || err.message);
      alert("Failed to set default billing address.");
    }
  };

  const resetForm = () => {
    setNewAddress({
      fullName: '',
      phoneNumber: '',
      address: '',
      city: '',
      state: '',
      pin: '',
      country: '',
      isDefaultBilling: false,
    });
    setEditAddressId(null);
  };
  const handlePlaceOrder = () => {
    if (selectedAddressId) {
      navigate("/ordersummery"); // Navigate back to home or another page after order placement
    } else {
      alert("Please select a delivery address!");
    }
  };

  return (
    <>
      <div className="container !my-4 flex w-full lg:w-[80%] gap-4 my-2 mx-auto">
      <div className="leftPart bg-white  p-5 w-[70%] lg:w-[70%]  w-full">
          <h2 className="text-[16px] font-[600] mb-4">Delivery Addresses</h2>
          {addresses.length === 0 ? (
            <div className="card px-4  shadow-sm  !pt-3 pb-1 bg-white mb-4 ">
            <p>No address added yet.</p>
            </div>
          ) : (
            addresses.map((addr) => (
              
              <div key={addr._id} 
              className={`card flex px-4 justify-between shadow-sm p-2 bg-white mb-4 cursor-pointer ${selectedAddressId === addr._id ? '!border-1 border-gray-200 p-3 shadow-xl' : 'bg-white'}`}
              onClick={() => setSelectedAddressId(addr._id)}
              >
                <div>
                <p>{addr.fullName}</p>
                <p>{addr.phoneNumber}</p>
                <p>
                  {addr.address},{addr.city} - {addr.pin}, {addr.state}, {addr.country}
                </p>
                {addr.isDefaultBilling && (
                  <p className="text-green-600 font-semibold">Default Billing</p>
                )}
                </div>
                <div className="flex gap-1 ">
                  <button
                    className=" !h-8 !p-0  "
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditAddressId(addr._id);
                      setNewAddress({ ...addr });
                    }}
                  >
                   < MdModeEdit className=' text-blue-400  !text-[22px]' />
                  </button>
                  {/* <button
                    className="!h-8 bg-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSetDefaultBilling(addr._id);
                    }}
                  >
                    Deliver Here
                  </button> */}
                  <button
                    className="!h-8  !p-0 "
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAddress(addr._id);
                    }}
                  >
                   <MdDelete className='text-red-600  !text-[22px]' />
                  </button>
                </div>
              </div>
            ))
          )}

        <div className="bg-white shadow-md rounded p-5 mt-2">
          <h3 className="text-[16px] font-[600] mb-3">
            {editAddressId ? 'Edit Address' : 'Add New Address'}
          </h3>
          <form onSubmit={handleSubmit} className="w-full ">
            {["fullName", "phoneNumber", "address", "city", "state", "pin", "country"].map((field) => (
              <TextField
                key={field}
                label={field.replace(/([A-Z])/g, " $1")}
                name={field}
                value={newAddress[field]}
                onChange={handleAddressChange}
                size="small"
                className="w-full !bg-white !my-2"  
                variant="filled"
                fullWidth
                required
              />
            ))}
            <div className="flex justify-center mt-2 gap-4">
              <Button type="submit" variant="contained" className={editAddressId ? "w-[30%]  !bg-[#fb541b] !h-[45px]" : "w-[30%] !bg-[#fb541b] !h-[45px]"}>
                {editAddressId ? 'Update Address' : 'Add Address'}
              </Button>
              {editAddressId && (
                <Button type="button" className='!h-[45px] w-[30%] border-blue-400' variant="outlined"  color="primary" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
     
      <div className="rightPart  w-full lg:!m-0 mt-4 lg:w-[30%]">
      <Totalprice handlePlaceOrder={handlePlaceOrder} />
      </div>
     </div>
    </>
  );
}

export default AddAddress;
