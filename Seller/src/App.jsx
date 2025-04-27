import React, { useState, createContext } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashBoard from './Pages/DashBoard/DashBoard';
import Header from './Components/Header/Header.jsx';
import SideBar from './Components/Sidebar/SideBar.jsx';
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
import CategoryList from './Pages/Category/CategoryList.jsx';
import AddCategory from './Pages/Category/AddCategory.jsx';
import SubCategoryList from './Pages/Category/SubCategoryList.jsx';
import AddSubCategory from './Pages/Category/AddSubCategory.jsx';
import Login from './Pages/Login/Login.jsx';
import SellerProfile from './Pages/Seller Profile/SellerProfile.jsx';
import ProtectedRoute from './Pages/ProtectedRoute.jsx';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const MyContext = createContext();

function Layout({ children }) {
  return (
    <section className='main'>
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
      open: false,
      model: ''
    });
  
    const values = {
      isOpenAddProductPanel,
      setIsOpenAddProductPanel
    };
  
    const router = createBrowserRouter([
      {
        path: '/',
        element: <ProtectedRoute><Layout><DashBoard /></Layout></ProtectedRoute>
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/products',
        element: <ProtectedRoute><Layout><ProductList /></Layout></ProtectedRoute>
      },
      {
        path: '/orders',
        element: <ProtectedRoute><Layout><OrdersList /></Layout></ProtectedRoute>
      },
      {
        path: '/categorylist',
        element: <ProtectedRoute><Layout><CategoryList /></Layout></ProtectedRoute>
      },
      {
        path: '/subcategorylist',
        element: <ProtectedRoute><Layout><SubCategoryList /></Layout></ProtectedRoute>
      },
      {
        path: '/seller-profile',
        element: <ProtectedRoute><Layout><SellerProfile /></Layout></ProtectedRoute>
      },
    ]);
  
    return (
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />
  
        {/* Dialog for Adding Products */}
        <Dialog
          fullScreen
          open={isOpenAddProductPanel.open}
          onClose={() => setIsOpenAddProductPanel({ open: false })}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }} className=' !bg-white !shadow-md !py-3'>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setIsOpenAddProductPanel({ open: false })}
                aria-label="close"
              >
                <IoMdClose className='text-gray-800 !text-[18px]' />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                <span className='text-gray-800'>{isOpenAddProductPanel?.model}</span>
              </Typography>
            </Toolbar>
          </AppBar>
          {
            isOpenAddProductPanel?.model === 'Add Product' && <AddProduct />
          }
          {
            isOpenAddProductPanel?.model === 'Add New Category' && <AddCategory />
          }
          {
            isOpenAddProductPanel?.model === 'Add New Sub Category' && <AddSubCategory />
          }
        </Dialog>
      </MyContext.Provider>
    );
  }
  

export default App;