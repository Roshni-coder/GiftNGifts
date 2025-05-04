import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import SideMenu from './SideMenu.jsx'
import { toast } from 'react-toastify';
function Myprofile() {
  const [profile, setProfile] = useState({ name: '', phone: '', email: '' });
 
  const [editing, setEditing] = useState(false);

  const token = localStorage.getItem('token') || null;

  const getProfile = async () => {
    try {
      const { data } = await axios.get('http://localhost:7000/api/user/profile', {
        headers: { token },
      });
      if (data.success) {
        setProfile(data.profile);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };
  
  useEffect(() => {
    getProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:7000/api/user/updateprofile',
        profile,
        { headers: { token } }
      );
      if (data.message) {
        toast(data.message);
        setEditing(false);
        getProfile();
      }
    } catch (err) {
      console.error('Error saving profile:', err?.response?.data || err.message);
    }
  };

  
  return (
    <>
      <section className="py-6 w-full">
      <div className="container w-[100%] flex gap-5">
        <div className="col1 w-[20%]">
        <SideMenu name={profile.name} email={profile.email} />

        </div>

        <div className="clo2 w-[80%]">
        <div className="card bg-white shadow-md rounded px-10">
        <h1 className="text-[17px] py-4 font-[600]">My Profile</h1>
        <div className="main flex justify-between">
          <div className="flex flex-col gap-1 pb-5">
            <p>Name: {profile.name}</p>
            <p>Phone: {profile.phone}</p>
            <p>Email: {profile.email}</p>
          </div>
          <div className="btn ">
            <button
              onClick={() => setEditing(true)}
              className="!px-8 border !font-[500] rounded !text-[#7d0492] border-[#7d0492] py-1"
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
      <br />
      </div>
      </div>
      </section>
    </>
  );
}

export default Myprofile;