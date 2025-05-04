import axios from 'axios';
import React, { useEffect, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AppContext = createContext();
axios.defaults.withCredentials = true;

export const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserdata] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const getuserData = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/user/data`);
      data.success ? setUserdata(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAuthsate = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/auth/is-auth`);
      if (data.success) {
        setIsLoggedin(true);
        getuserData();
        fetchCart(); // Load cart globally
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
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
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:7000/api/auth/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlistItems(res.data.wishlist || []); // Update the state
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
        setCartItems([]);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAuthsate();
  }, []);

  const value = {
    backendurl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserdata,
    getuserData,
    logout,
    cartItems,
    setCartItems,
    wishlistItems,
    setWishlistItems,
    fetchCart,
    fetchWishlist
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
