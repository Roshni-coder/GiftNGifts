import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Appcontext";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const { backendurl, setIsLoggedin, getuserData } = useContext(AppContext);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpPage, setIsOtpPage] = useState(false); // Flag to toggle OTP verification page

  const inputRefs = useRef([]);
  
  // Handle input focus for OTP
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  // Handle form submission for sign up or login
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(backendurl + "/api/auth/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          toast.success("Account created successfully! Please verify OTP.");
          setIsOtpPage(true); // Show OTP page after successful registration
          localStorage.setItem("email", email); // Store email temporarily for verification
          localStorage.setItem("token", data.token);
          // Send the OTP verification email after successful registration
          await sendVerificationEmail();
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendurl + "/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getuserData();
          localStorage.setItem("token", data.token);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle OTP verification
  const verifyOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      const { data } = await axios.post(backendurl + "/api/auth/verify-Account", { otp });

      if (data.success) {
        toast.success(data.message);
        setIsOtpPage(false); // Hide OTP page after successful verification
        getuserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Send the OTP verification email after successful registration
  const sendVerificationEmail = async () => {
    try {
      const { data } = await axios.post(backendurl + "/api/auth/send-verify-otp", { email });
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center mt-5 px-6 sm:px-0 bg-gradient-to-br">
      <div className="bg-white p-6 sm:p-10 rounded-lg shadow-lg w-full sm:w-100 xl:w-[35%] text-black-300 text-sm">
        <h2 className="text-2xl font-semibold text-center mb-10">
          {isOtpPage
            ? "Verify OTP"
            : state === "Sign Up"
            ? "Create Account"
            : "Login"}
        </h2>

        {/* If OTP Page is active */}
        {isOtpPage ? (
          <form onSubmit={verifyOtpHandler}>
            <div className="flex justify-between mb-8" onPaste={handlePaste}>
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    type="text"
                    maxLength={1}
                    key={index}
                    required
                    className="w-12 h-12 border border-gray-400 text-center text-xl rounded-md"
                    ref={(e) => (inputRefs.current[index] = e)}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                  />
                ))}
            </div>
            <button className="w-full py-3 bg-[#fb541b] text-white rounded">
              Verify Email
            </button>
          </form>
        ) : (
          // Sign Up or Login Form
          <form onSubmit={onSubmitHandler}>
            {state === "Sign Up" && (
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded border border-gray-400">
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="bg-transparent outline-none"
                  type="text"
                  placeholder="Full Name"
                  required
                />
              </div>
            )}

            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded border border-gray-400">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="bg-transparent outline-none"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="mb-2 flex items-center gap-3 w-full px-5 py-2.5 rounded border border-gray-400">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="bg-transparent outline-none"
                type="password"
                placeholder="Enter Password"
                required
              />
            </div>

            <p
              onClick={() => navigate("/Reset_pass")}
              className="text-black cursor-pointer hover:text-blue-700"
            >
              Forgot Password?
            </p>
            <button className="w-full !py-3 rounded mt-1 bg-[#fb541b] text-white font-medium">
              {state}
            </button>
          </form>
        )}

        {/* Toggle between Sign Up and Login */}
        {!isOtpPage && (
          <p className="text-black-400 text-center text-ls mt-4">
            {state === "Sign Up" ? (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setState("Login")}
                  className="text-blue-700 cursor-pointer underline"
                >
                  Login here
                </span>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <span
                  onClick={() => setState("Sign Up")}
                  className="text-blue-700 cursor-pointer underline"
                >
                  Sign up here
                </span>
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;