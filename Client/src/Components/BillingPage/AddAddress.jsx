// ... (imports remain the same)
import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import Totalprice from '../Cart Page/Totalprice.jsx';
import { MdModeEdit, MdDelete } from "react-icons/md";
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function AddAddress() {
  const navigate = useNavigate();
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
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
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

    const isDuplicate = addresses.some((addr) => (
      addr.fullName === newAddress.fullName &&
      addr.phoneNumber === newAddress.phoneNumber &&
      addr.address === newAddress.address &&
      addr.city === newAddress.city &&
      addr.state === newAddress.state &&
      addr.pin === newAddress.pin &&
      addr.country === newAddress.country &&
      addr._id !== editAddressId
    ));

    if (isDuplicate) {
     toast("This address already exists.");
      return;
    }

    try {
      if (editAddressId) {
        const { data } = await axios.put(
          `http://localhost:7000/api/user/updateaddress/${editAddressId}`,
          { userId: profile.user || profile._id, address: newAddress },
          { headers: { token } }
        );
        if (data.success) {
          toast("Address updated successfully");
        }
      } else {
        const { data } = await axios.post(
          'http://localhost:7000/api/user/addaddress',
          { address: newAddress },
          { headers: { token } }
        );
        if (data.success) {
          toast("Address added successfully");
        }
      }

      resetForm();
      getProfile();
      setShowAddForm(false);
    } catch (err) {
      console.error('Address operation error:', err?.response?.data || err.message);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    try {
      const { data } = await axios.delete(
        `http://localhost:7000/api/user/deleteaddress/${addressId}`,
        {
          data: { userId: profile.user || profile._id },
          headers: { token },
        }
      );
      if (data.success) {
        toast(data.message);
        getProfile();
      }
    } catch (error) {
      console.error("Delete address error:", error?.response?.data || error.message);
      toast("Failed to delete address.");
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
    if (selectedAddress) {
      localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
      navigate("/ordersummery");
    } else {
      toast("Please select a delivery address!");
    }
  };

  return (
    <div className="container !my-4 flex w-full lg:w-[80%] gap-4 mx-auto">
      <div className="leftPart bg-white p-5 w-[70%] lg:w-[70%]">
        <div className="flex justify-between py-2 my-2 items-center">
          <h2 className="text-[16px] font-[600]">Delivery Addresses</h2>
          <Button
            className="border border-gray-200 text-[12px]"
            variant="outlined"
            onClick={() => {
              resetForm();
              setShowAddForm(true);
            }}
          >
            + Add New Address
          </Button>
        </div>

        {addresses.length === 0 ? (
          <div className="card px-2 shadow-sm pt-3 pb-1 bg-white mb-4">
            <p>No address added yet.</p>
          </div>
        ) : (
          addresses.map((addr) => (
            <div
              key={addr._id}
              className={`flex felx-row items-center mb-4 !w-[100%] justify-between shadow ${
                selectedAddress?._id === addr._id ? 'border border-gray-200 shadow-xl' : 'bg-white'
              }`}
              onClick={() => setSelectedAddress(addr)}
            >
              <div className="card flex flex-col gap-2 px-4 p-3 bg-white mb-2 rounded">
                <p>{addr.fullName}</p>
                <p>{addr.phoneNumber}</p>
                <p>{addr.address}, {addr.city} - {addr.pin}, {addr.state}, {addr.country}</p>
                {addr.isDefaultBilling && (
                  <p className="text-green-600 font-semibold">Default Billing</p>
                )}
              </div>
              <div className="flex justify-end items-center gap-2">
                <button
                  className="h-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditAddressId(addr._id);
                    setNewAddress({ ...addr });
                    setShowAddForm(true);
                  }}
                >
                  <MdModeEdit className="text-blue-400 text-[22px]" />
                </button>
                <button
                  className="h-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteAddress(addr._id);
                  }}
                >
                  <MdDelete className="text-red-600 text-[22px]" />
                </button>
              </div>
            </div>
          ))
        )}

        {/* Conditionally show button if there is at least one address */}
        {addresses.length > 0 && (
          <Button
            variant="contained"
            className="w-[40%] float-right !text-white !bg-[#fb541b] !rounded-none !h-[45px]"
            onClick={() => handlePlaceOrder()}
          >
            Deliver Here
          </Button>
        )}

        {(showAddForm || editAddressId) && (
          <div className="bg-white shadow-md rounded p-5 mt-2">
            <h3 className="text-[16px] font-[600] mb-3">
              {editAddressId ? 'Edit Address' : 'Add New Address'}
            </h3>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
              {["fullName", "phoneNumber", "address", "city", "state", "pin", "country"].map((field) => (
                <TextField
                  key={field}
                  label={field.replace(/([A-Z])/g, " $1")}
                  name={field}
                  value={newAddress[field]}
                  onChange={handleAddressChange}
                  size="small"
                  className="w-full my-2"
                  variant="filled"
                  required
                />
              ))}
              <div className="flex justify-center mt-2 gap-4">
                <Button
                  type="submit"
                  variant="contained"
                  className="w-[30%] !bg-[#fb541b] !h-[45px]"
                >
                  {editAddressId ? 'Update Address' : 'Add Address'}
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  className="h-[45px] w-[30%] border-blue-400"
                  onClick={() => {
                    resetForm();
                    setShowAddForm(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="rightPart w-full lg:m-0 mt-4 lg:w-[30%]">
        <Totalprice />
      </div>
    </div>
  );
}

export default AddAddress;
