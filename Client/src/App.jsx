import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from './Components/Home/Header/Header.jsx'
import Home from "../src/Components/Home/HomePage.jsx"
import Footer from "./Components/Home/Footer/Footer.jsx";
import ProductList from "./Components/ProductList/ProductList.jsx";
import ProductDetail from "./Components/ProductDetalis/ProductDetail.jsx";
import Login from "./Components/LoginPage/Login.jsx";
import Emailverify from "./Components/LoginPage/Emailverify.jsx";
import Reset_pass from "./Components/LoginPage/Reset_pass.jsx";
import MyProfile from "./Components/My Profile/MyProfile.jsx";
import Cartpage from "./Components/Cart Page/Cartpage.jsx";
import Orders from "./Components/Orders/Orders.jsx";
import ChatBot from "./Components/ChatBot/Chatbot.jsx";
import AddAddress from "./Components/BillingPage/AddAddress.jsx";
import WishlistPage from "./Components/Wish List/WishlistPage.jsx";
import OrderSummery from './Components/Order Summery/OrderSummery.jsx'

function App() {
  return (
    <>
      <Header />
      <Routes>  {/**/}
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path='/email-verify' element={<Emailverify/>}/>
        <Route path='/Reset_pass' element={<Reset_pass/>}/>
        <Route path='/myProfile' element={<MyProfile/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/wishlist' element={<WishlistPage/>}/>
        <Route path="/productlist" element={<ProductList/>}/>
        <Route path="/products/:id" element={<ProductDetail/>}/>
        <Route path="/cartlist" element={<Cartpage/>}/>
        {/* <Route path="/checkout" element={<Checkout/>}/> */}
        <Route path="/addaddress" element={<AddAddress/>}/>
        <Route path="/ordersummery" element={<OrderSummery/>}/>
      </Routes>
      <ChatBot/>
      <Footer/>
    </>
  );
}

export default App;
