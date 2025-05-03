import React, { useContext, useState } from 'react';
import { Admincontext } from '../../Components/context/admincontext';
import axios from 'axios';
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";

function Login() {
  const [state, setState] = useState('Admin'); // Admin or Seller
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // For seller registration only
  const {backendurl,setatoken}=useContext(Admincontext)
  const navigate = useNavigate();

  const handleSubmit =async (e) => {
    e.preventDefault();
    
      try{
      if( state === 'Seller') {
        if (isRegister){
      const {data}=await axios.post(backendurl + '/api/seller/register',{name,email,password})
               
   if(data.success){
       localStorage.setItem('stoken',data.token)
       localStorage.setItem('name',data.name)
       setatoken(data.token)
       console.log("token",data.token)
       toast.success(data.message)
       navigate('/')
   }
   else{
    toast.error(data.message)
   }
        }
      else{
        const {data}=await axios.post(backendurl + '/api/seller/login',{email,password})
                
        if(data.success){
         localStorage.setItem('stoken',data.token)
         localStorage.setItem('name',data.user.name)
         setatoken(data.token)
         console.log(data.token)
         toast.success(data.message)
         navigate('/')
        }
  
        else{
          toast.error(data.message)
         }
      }
      
    }
   
      }
      catch(e){
       toast.error(e.message)
      }
    
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5e5e5e] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-[#5f6fff] ">{state}</span>
          &nbsp;{isRegister ? 'Register' : 'Login'}
        </p>

        {isRegister && state === 'Seller' && (
          <div className="w-full">
            <p>Name</p>
            <input
              className="border border-[#dadada] rounded w-full p-2 mt-1"
              type="text"
              required
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-[#dadada] rounded w-full p-2 mt-1"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-[#dadada] rounded w-full p-2 mt-1"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="bg-[#5f6fff] text-white w-full py-2 rounded-md text-base cursor-pointer">
          {isRegister ? 'Register' : 'Login'}
        </button>

        {/* Switch between Admin and Seller */}
        {state === 'Admin' ? (
          <p>
            Want to login as Seller?{' '}
            <span
              className="text-[#5f6fff] cursor-pointer underline"
              onClick={() => {
                setState('Seller');
                setIsRegister(false);
              }}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{' '}
            <span
              className="text-[#5f6fff] cursor-pointer underline"
              onClick={() => {
                setState('Admin');
                setIsRegister(false);
              }}
            >
              Click here
            </span>
          </p>
        )}

        {/* Register link only for Seller */}
        {state === 'Seller' && (
          <p>
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <span
              className="text-[#5f6fff] cursor-pointer underline"
              onClick={() => setIsRegister((prev) => !prev)}
            >
              {isRegister ? 'Login here' : 'Register here'}
            </span>
          </p>
        )}
      </div>
    </form>
  );
}

export default Login;
