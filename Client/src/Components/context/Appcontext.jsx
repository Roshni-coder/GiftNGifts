import axios from 'axios';
import React, { useEffect, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AppContext = createContext();
axios.defaults.withCredentials = true;

export const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const backendurl = import.meta.env.VITE_BACKEND_URL || "http://localhost:7000";
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserdata] = useState(false);

  // New profile state for detailed user profile info
  const [profile, setProfile] = useState({ name: '', phone: '', email: '' });

  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const token = localStorage.getItem('token') || null;

  // Fetch detailed profile info (name, phone, email)
  const fetchProfile = async () => {
    if (!token) return; // No token, no fetch
    try {
      const { data } = await axios.get(`${backendurl}/api/user/profile`, {
        headers: { token },
      });
      if (data.success && data.profile) {
        setProfile(data.profile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // Fetch basic user data (like userData)
  const getuserData = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/user/data`);
      if (data.success) {
        setUserdata(data.userData);
        // Fetch profile info after userData load
        fetchProfile();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAuthstate = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/auth/is-auth`);
      if (data.success) {
        setIsLoggedin(true);
        getuserData();
        fetchCart();
        fetchWishlist();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchCart = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${backendurl}/api/auth/Cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.cart);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const fetchWishlist = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${backendurl}/api/auth/wishlist`, {
        headers: { Authorization: `Bearer ${token} `},
      });
      setWishlistItems(res.data.wishlist || []);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post(`${backendurl}/api/auth/logout`);
      if (data.success) {
        setIsLoggedin(false);
        setUserdata(false);
        setProfile({ name: '', phone: '', email: '' }); // clear profile on logout
        setCartItems([]);
        setWishlistItems([]);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAuthstate();
  }, []);

  const value = {
    backendurl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserdata,
    profile,         // expose profile state
    setProfile,
    fetchProfile,    // expose fetchProfile for manual refresh if needed
    logout,
    cartItems,
    setCartItems,
    wishlistItems,
    setWishlistItems,
    fetchCart,
    fetchWishlist,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};