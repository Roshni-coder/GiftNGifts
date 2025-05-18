import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Appcontext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendurl, setIsLoggedin, getuserData } = useContext(AppContext);

  const [state, setState] = useState("Login"); // Login or Sign Up
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOtpPage, setIsOtpPage] = useState(false); // OTP screen toggle
  const inputRefs = useRef([]);

  // Focus handling for OTP fields
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

  // Handle Sign Up or Login submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendurl}/api/auth/register`, {
          name,
          email,
          password,
        });

        if (data.success) {
          toast.success("Account created successfully!");
          setState("Login");
          navigate("/"); 
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendurl}/api/auth/login`, {
          email,
          password,
        });

        if (data.success) {
          // Send OTP to the email after successful login
          await sendOtpToEmail();

          // Show OTP page for user to enter the OTP
          setIsOtpPage(true);
          toast.success("OTP sent to your email.");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // Function to request the backend to send OTP to the email
  const sendOtpToEmail = async () => {
    try {
      const { data } = await axios.post(`${backendurl}/api/auth/send-verify-otp`, { email });
      if (data.success) {
        toast.success("OTP has been sent to your email.");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending OTP.");
    }
  };

  // Handle OTP verification
  const verifyOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const otpArray = inputRefs.current.map((input) => input.value);
      const otp = otpArray.join("");

      const { data } = await axios.post(`${backendurl}/api/auth/verify-login-otp`, { email, otp });

      if (data.success) {
        toast.success(data.message);
        setIsLoggedin(true);
        getuserData();
        navigate("/"); // Redirect to home after successful login
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed.");
    }
  };

  return (
    <div className="flex justify-center items-center mt-5 px-6 sm:px-0 bg-gradient-to-br">
      <div className="bg-white p-6 sm:p-10 rounded-lg shadow-lg w-full sm:w-100 xl:w-[35%] text-black-300 text-sm">
        <h2 className="text-2xl font-semibold text-center mb-10">
          {isOtpPage ? "Verify OTP" : state === "Sign Up" ? "Create Account" : "Login"}
        </h2>

        {/* OTP Verification Form */}
        {isOtpPage ? (
          <form onSubmit={verifyOtpHandler}>
            <div className="flex justify-between mb-8" onPaste={handlePaste}>
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    required
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="w-12 h-12 border border-gray-400 text-center text-xl rounded-md"
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                  />
                ))}
            </div>
            <button type="submit" className="w-full py-3 bg-[#fb541b] text-white rounded">
              Verify OTP
            </button>
          </form>
        ) : (
          <form onSubmit={onSubmitHandler}>
            {state === "Sign Up" && (
              <div className="mb-4">
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="w-full px-4 py-2 border rounded"
                  type="text"
                  placeholder="Full Name"
                  required
                />
              </div>
            )}

            <div className="mb-4">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full px-4 py-2 border rounded"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="mb-4">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full px-4 py-2 border rounded"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <p
              onClick={() => navigate("/Reset_pass")}
              className="text-black cursor-pointer hover:text-blue-700 text-sm mb-2"
            >
              Forgot Password?
            </p>

            <button type="submit" className="w-full py-3 bg-[#fb541b] text-white rounded font-medium">
              {state}
            </button>
          </form>
        )}

        {!isOtpPage && (
          <p className="text-center text-sm mt-4">
            {state === "Sign Up" ? (
              <>
                Already have an account?{" "}
                <span className="text-blue-700 cursor-pointer underline" onClick={() => setState("Login")}>
                  Login here
                </span>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <span className="text-blue-700 cursor-pointer underline" onClick={() => setState("Sign Up")}>
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
