import React, { useContext, useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import SideMenu from './SideMenu.jsx';
import { toast } from 'react-toastify';
import { AppContext } from '../context/Appcontext.jsx';

function Myprofile() {
  const { profile, setProfile, backendurl } = useContext(AppContext);
  const [editing, setEditing] = useState(false);
  const [localProfile, setLocalProfile] = useState(profile); // local copy for editing

  const token = localStorage.getItem('token') || null;

  // Keep localProfile in sync with context profile on context change
  useEffect(() => {
    setLocalProfile(profile);
  }, [profile]);

  const handleChange = (e) => {
    setLocalProfile({ ...localProfile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/updateprofile`,
        localProfile,
        { headers: { token } }
      );
      if (data.message) {
        toast(data.message);
        setEditing(false);
        setProfile(localProfile); // Update context profile after successful save
      }
    } catch (err) {
      console.error('Error saving profile:', err?.response?.data || err.message);
    }
  };

  return (
    <>
      <section className="py-6 w-full">
        <div className="container w-[100%] lg:!flex  lg:flex-row  flex flex-col gap-5">
          <div className="col1 lg:w-[20%] w-full ">
            <SideMenu />
          </div>
          <div className="clo2 lg:w-[80%] w-full">
            <div className="card bg-white shadow-md rounded px-6">
              <h1 className="text-[17px] py-4 font-[600]">My Profile</h1>
              <div className="main flex justify-between">
                <div className="flex flex-col gap-1 pb-5">
                  <p className='!flex '>Name: {profile.name}</p>
                  <p className='!flex '>Phone: {profile.phone}</p>
                  <p className='!flex '>Email: {profile.email}</p>
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
                      value={localProfile.name || ''}
                      onChange={handleChange}
                      size="small"
                      variant="filled"
                      required
                    />
                    <TextField
                      className="w-full lg:w-[50%] lg:mt-0 mt-3"
                      label="Phone Number"
                      name="phone"
                      value={localProfile.phone || ''}
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
                    value={localProfile.email || ''}
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

export default Myprofile;
