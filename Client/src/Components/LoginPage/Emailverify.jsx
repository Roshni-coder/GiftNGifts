import axios from 'axios';
import React, { useEffect } from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/Appcontext.jsx';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Emailverify() {
    //send for cokie--
    axios.defaults.withCredentials = true;

    const { backendurl, isLoggedin, userData, getuserData } = useContext(AppContext)

    const inputRefs = React.useRef([])
    const navigate = useNavigate()

    //for get value one by one---
    const handelInput = (e, index) => {
        if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    }

    //for delete value one by one---
    const handeldown = (e, index) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    }

    //Hnadel pest feature---
    const handelpast = (e) => {
        const paste = e.clipboardData.getData('text');
        const pasteArray = paste.split('')
        pasteArray.forEach((char, index) => {
            if (inputRefs.current[index]) {
                inputRefs.current[index].value = char;
            }
        })
    }

    //Handel the data is varify or not------
    const onHnadelsubit = async (e) => {
        try {
            e.preventDefault();
            const otpArray = inputRefs.current.map(e => e.value);
            const otp = otpArray.join('')
            const { data } = await axios.post(backendurl + '/api/auth/verify-Account', { otp })

            if (data.success) {
                toast.success(data.message);
                getuserData()
                navigate('/')
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        isLoggedin && userData && userData.isAccountVerify && navigate('/')
    },[isLoggedin, userData])
     

    return (
        <div className='flex items-center justify-center mt-5 px-6 sm:px-0 bg-gradient-to-br  '>
            <form onSubmit={onHnadelsubit} className='bg-state-900 p-8 rounded-lg shadow-lg sm:w-100 xl:w-[35%] bg-white text-sm'>
                <h1 className=' text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
                <p className='text-center mb-6  text-1xl'>Enter the 6-digit code send to your email id.</p>
                <div className='flex justify-between mb-8' onPaste={handelpast}>
                    {Array(6).fill(0).map((_, index) => (
                        <input type="text" maxLength={1} key={index} required className='w-12 h-12 border border-gray-400  text-center text-xl rounded-md'
                            ref={e => inputRefs.current[index] = e}
                            onInput={(e) => handelInput(e, index)}
                            onKeyDown={(e) => handeldown(e, index)} />
                    ))}

                </div>
                <button className='w-full !py-3 !bg-[#fb541b] text-white rounded'>Verify Email</button>
            </form>
        </div>
    )
}

export default Emailverify