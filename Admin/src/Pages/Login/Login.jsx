import React, { useContext, useState } from 'react';
import { Admincontext } from '../../Components/context/admincontext';
import axios from 'axios';
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

    if (!email || !password || (isRegister && !name)) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const url = `${backendurl}/api/admin/${isRegister ? 'register' : 'login'}`;
      const payload = isRegister ? { name, email, password } : { email, password };

      const { data } = await axios.post(url, payload);

      if (data.success) {
        localStorage.setItem('atoken', data.token);
        localStorage.setItem('name', isRegister ? data.name : data.user.name);
        setatoken(data.token);
        alert(isRegister ? 'Admin Registered Successfully ✅' : 'Admin Login Successful ✅');
        navigate('/');
      } else {
        alert(data.message || 'Something went wrong ❌');
      }
    } catch (e) {
      alert(e.response?.data?.message || 'Server Error ❌');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-[80vh] flex items-center justify-center md:mt-15 px-4 sm:px-6">
      <div className="flex flex-col gap-4 items-start p-6 sm:p-8 w-full max-w-md border rounded-xl text-[#5e5e5e] text-sm shadow-lg bg-white">
        <p className="text-2xl font-semibold w-full !text-center sm:text-left">
          <span className="text-[#5f6fff] ">Admin</span>&nbsp;
          {isRegister ? 'Register' : 'Login'}
        </p>

        {isRegister && (
          <div className="w-full">
            <label className="block mb-1 font-medium">Name</label>
            <input
              className="border border-[#dadada] rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="w-full">
          <label className="block mb-1 font-medium">Email</label>
          <input
            className="border border-[#dadada] rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="w-full">
          <label className="block mb-1 font-medium">Password</label>
          <input
            className="border border-[#dadada] rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-[#5f6fff] text-white w-full py-3 rounded-md text-base cursor-pointer hover:bg-[#4e59d8] transition-colors duration-300"
        >
          {isRegister ? 'Register' : 'Login'}
        </button>

        <p className="text-center w-full text-sm text-[#333]">
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
