import React, { useState, createContext } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashBoard from './Pages/DashBoard/DashBoard';
import Header from './Components/Header/Header.jsx';
import SideBar from './Components/Sidebar/SideBar.jsx';

import Login from './Pages/Login/Login.jsx';
import ProductList from './Pages/Product Pages/ProductList.jsx';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IoMdClose } from "react-icons/io";
import { Slide } from '@mui/material';
import AddProduct from './Pages/Product Pages/AddProduct.jsx';
import OrdersList from './Pages/Orders Pages/OrdersList.jsx';
import HomeSliderBaneerList from './Pages/HomeSliderBanners/HomeSliderBaneerList.jsx';
import AddHomeSliderBanner from './Pages/HomeSliderBanners/AddHomeSliderBanner.jsx';
import CategoryList from './Pages/Category/CategoryList.jsx';
import AddCategory from './Pages/Category/AddCategory.jsx';
import SubCategoryList from './Pages/Category/SubCategoryList.jsx';
import AddSubCategory from './Pages/Category/AddSubCategory.jsx';
import UsersList from './Pages/Users Page/UsersList.jsx';
import { ToastContainer } from 'react-toastify';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const MyContext = createContext();


function Layout({ children }) {
  return (
    <section className='main'>
        <ToastContainer/> 
      <Header />
      <div className="mainContaint flex">
        <div className="sidebarWrapper !w-[18%]">
          <SideBar />
        </div>
        <div className="contentRight !w-[82%] !py-4 !px-3 ">
          {children}
        </div>
      </div>
    </section>
  );
}

function App() {
  const [isOpenAddProductPanel, setIsOpenAddProductPanel] = useState({
    open:false,
    model:''
  });

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout><DashBoard /></Layout>
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/products',
      element: <Layout><ProductList /></Layout>
    },
    {
      path: '/orders',
      element: <Layout><OrdersList/></Layout>
    },
    {
      path: '/Homesliderbanners',
      element: <Layout><HomeSliderBaneerList/></Layout>
    },
    {
      path: '/categorylist',
      element: <Layout><CategoryList/></Layout>
    },
    {
      path: '/subcategorylist',
      element: <Layout><SubCategoryList/></Layout>
    },
    {
      path: '/users',
      element: <Layout><UsersList/></Layout>
    },
  ]);

  const values = {
    isOpenAddProductPanel,
    setIsOpenAddProductPanel // Ensure this is present
  };
  

  return (
    <MyContext.Provider value={values}>
      <RouterProvider router={router} />

      {/* Dialog for Adding Products */}
      <Dialog
        fullScreen
        open={isOpenAddProductPanel.open}
        onClose={() => setIsOpenAddProductPanel({
          open:false
        })}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }} className=' !bg-white !shadow-md !py-3'>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setIsOpenAddProductPanel({
                open:false
              })}
              aria-label="close"
            >
              <IoMdClose className='text-gray-800 !text-[18px]'/>
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
             <span className='text-gray-800'>{isOpenAddProductPanel?.model}</span>
            </Typography>
          </Toolbar>
        </AppBar>
        {
          isOpenAddProductPanel?.model === 'Add Product' && <AddProduct/>
        }
        {
          isOpenAddProductPanel?.model === 'Add Home Slide' && <AddHomeSliderBanner/>
        }
        {
          isOpenAddProductPanel?.model === 'Add New Category' && <AddCategory/>
        }
        {
          isOpenAddProductPanel?.model === 'Add New Sub Category' && <AddSubCategory/>
        }
      </Dialog>
      
    </MyContext.Provider>
  );
}

export default App;

