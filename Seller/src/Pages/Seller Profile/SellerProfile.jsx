import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

function SellerProfile() {
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    email: ''
  });
const stoken=localStorage.getItem("stoken") || null
if(stoken){
  console.log(stoken)
}
  const [editing, setEditing] = useState(false);

  // Fetch profile data on component mount
  const getProfile = async () => {
    try {
      const { data } = await axios.get('http://localhost:7000/api/seller/profile',{headers:{stoken}});
      if (data.success) {
        setProfile({
          name: data.seller.name,
          phone: data.seller.phone,
          email: data.seller.email
        });
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  // Call getProfile when component mounts
  useEffect(() => {
    getProfile();
    console.log(profile);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    console.log("Input changed:", e.target.name, e.target.value);
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:7000/api/seller/updateprofile', profile,{headers:{stoken}});
      if (data.message) {
        alert(data.message);
        setEditing(false);
        getProfile(); // refresh profile after update
      }
    } catch (err) {
      console.error('Error saving profile:', err?.response?.data || err.message);
    }
  };

  return (
    <>
      <div className="card bg-white shadow-md rounded px-10">
        <h1 className="text-[17px] py-4 font-[600]">Admin Profile</h1>
        <div className="main flex justify-between">
          <div className="flex flex-col gap-1 pb-5">
            <p>Name: {profile.name}</p>
            <p>Phone: {profile.phone}</p>
            <p>Email: {profile.email}</p>
          </div>
          <div className="btn !pb-10">
            <button
              onClick={() => setEditing(true)}
              className="!px-10 border rounded border-blue-500 py-1 text-blue-500"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      <br />

      {editing && (
        <div className="card bg-white shadow-md rounded p-10">
          <form className="w-full items-center !m-auto" onSubmit={handleSubmit}>
            <h6 className="pt-3 mb-2 px-1 text-[13px] font-[500]">Name and Phone *</h6>
            <div className="lg:flex items-center gap-3">
              <TextField
                className="w-full lg:w-[50%]"
                label="Full Name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                size="small"
                variant="filled"
                required
              />
              <TextField
                className="w-full lg:w-[50%] lg:mt-0 mt-3"
                label="Phone Number"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                size="small"
                variant="filled"
                required
              />
            </div>
            <h6 className="pt-3 mb-2 px-1 text-[13px] font-[500]">Email Address *</h6>
            <TextField
              className="w-[100%]"
              label="Email Address"
              name="email"
              value={profile.email}
              onChange={handleChange}
              size="small"
              variant="filled"
              required
            />
            <div className="btn flex justify-center mt-8 w-full">
              <Button
                type="submit"
                variant="contained"
                className="w-[35%] !m-auto !bg-[#fb541b] !h-[45px]"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default SellerProfile;
