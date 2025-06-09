import React, { useContext, useState } from 'react';
import { Admincontext } from '../../Components/context/admincontext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [state, setState] = useState('Admin'); // Admin or Seller
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { backendurl, setatoken } = useContext(Admincontext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Seller') {
        if (isRegister) {
          // Seller Registration
          const { data } = await axios.post(backendurl + '/api/seller/register', {
            name,
            email,
            password,
          });

          if (data.success) {
            localStorage.setItem('stoken', data.token);
            localStorage.setItem('name', data.name);
            setatoken(data.token);
            toast.success('Registration successfully');
            navigate('/');
          } else {
            toast.error(data.message || 'Registration failed');
          }
        } else {
          // Seller Login
          const { data } = await axios.post(backendurl + '/api/seller/login', {
            email,
            password,
          });

          if (data.success) {
            localStorage.setItem('stoken', data.token);
            localStorage.setItem('name', data.user.name);
            setatoken(data.token);
            toast.success('Login successfully');
            navigate('/');
          } else {
            toast.error(data.message || 'Login failed');
          }
        }
      } else {
        toast.info('Admin login is not implemented yet.');
      }
    } catch (e) {
      toast.error(e.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-[90vh] mt-10 flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-[#5e5e5e] text-sm">
        <p className="text-3xl font-semibold text-center mb-6">
          <span className="text-[#5f6fff]">{state}</span>&nbsp;
          {isRegister ? 'Register' : 'Login'}
        </p>

        {isRegister && state === 'Seller' && (
          <div className="mb-4">
            <label className="block mb-1 font-medium" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="border border-[#dadada] rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
              type="text"
              required
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="border border-[#dadada] rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="border border-[#dadada] rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-[#5f6fff] hover:bg-[#4e5de7] text-white w-full py-3 rounded-md text-base font-semibold transition"
        >
          {isRegister ? 'Register' : 'Login'}
        </button>

        {/* Toggle between Admin and Seller */}
        <p className="text-center mt-5 text-sm text-gray-600">
          {state === 'Admin' ? (
            <>
              Want to login as Seller?{' '}
              <span
                className="text-[#5f6fff] cursor-pointer underline"
                onClick={() => {
                  setState('Seller');
                  setIsRegister(false);
                  setEmail('');
                  setPassword('');
                  setName('');
                }}
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Admin Login?{' '}
              <span
                className="text-[#5f6fff] cursor-pointer underline"
                onClick={() => {
                  setState('Admin');
                  setIsRegister(false);
                  setEmail('');
                  setPassword('');
                  setName('');
                }}
              >
                Click here
              </span>
            </>
          )}
        </p>

        {/* Register option only for Seller */}
        {state === 'Seller' && (
          <p className="text-center mt-2 text-sm text-gray-600">
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
