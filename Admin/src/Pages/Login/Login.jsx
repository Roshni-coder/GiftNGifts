import React, { useContext, useState } from 'react';
import { Admincontext } from '../../Components/context/admincontext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { backendurl, setatoken } = useContext(Admincontext);
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Basic client-side validation
  if (!email || !password || (isRegister && !name)) {
    toast.error("Please fill in all required fields.");
    return;
  }

  try {
    if (isRegister) {
      const { data } = await axios.post(`${backendurl}/api/admin/register`, {
        name,
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem('atoken', data.token);
        localStorage.setItem('name', data.name);
        setatoken(data.token);
        toast.success('Admin Registered Successfully ✅');
        navigate('/');
      } else {
        toast.error(data.message || 'Registration failed ❌');
      }
    } else {
      const { data } = await axios.post(`${backendurl}/api/admin/login`, {
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem('atoken', data.token);
        localStorage.setItem('name', data.user.name);
        setatoken(data.token);
        toast.success('Admin Login Successful ✅');
        navigate('/');
      } else {
        toast.error(data.message || 'Login failed ❌');
      }
    }
  } catch (e) {
    toast.error(e.response?.data?.message || 'Something went wrong ❌');
  }
};


  return (
    <form onSubmit={handleSubmit} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5e5e5e] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-[#5f6fff]">Admin</span>&nbsp;
          {isRegister ? 'Register' : 'Login'}
        </p>

        {isRegister && (
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
            placeholder="Enter your email"
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-[#5f6fff] text-white w-full py-2 rounded-md text-base cursor-pointer"
        >
          {isRegister ? 'Register' : 'Login'}
        </button>

        <p>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            className="text-[#5f6fff] cursor-pointer underline"
            onClick={() => setIsRegister((prev) => !prev)}
          >
            {isRegister ? 'Login here' : 'Register here'}
          </span>
        </p>
      </div>
    </form>
  );
}

export default Login;
