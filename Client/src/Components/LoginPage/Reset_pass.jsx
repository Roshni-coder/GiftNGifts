import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/Appcontext'
import axios from 'axios'
import { toast } from 'react-toastify'

function Reset_pass() {

    const { backendurl } = useContext(AppContext)
    axios.defaults.withCredentials = true

    const navigate = useNavigate()
    const inputRefs = React.useRef([])
    const [email, setemail] = useState('')
    const [newpassword, setnewpassword] = useState('')
    const [isEmailsent, setisEmailsent] = useState('')
    const [otp, setotp] = useState(0)
    const [isotpsubmitted, seisotpsubmitted] = useState(false)


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

    const onSubmitEmail = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(backendurl + '/api/auth/send-reset-otp', { email })
            data.success ? toast.success(data.message) : toast.error(data.message)
            data.success && setisEmailsent(true)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const onsubmitotp = async (e) => {
        e.preventDefault();
        const otpArray = inputRefs.current.map(e => e.value)
        setotp(otpArray.join(''))
        seisotpsubmitted(true)
    }

    const onSubmitpassword = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(backendurl + '/api/auth/reset-password', { email, otp, newpassword })
            data.success ? toast.success(data.message) : toast.error(data.message)
            data.success && navigate('/login')
        } catch (error) {
            toast.error(error.message)
        }
    }



    return (
        <div className='flex items-center justify-center mt-5 px-6 sm:px-0 bg-gradient-to-br'>

            {!isEmailsent &&
                <form onSubmit={onSubmitEmail} className='bg-state-900 p-8 bg-white rounded-lg shadow-lg sm:w-100 xl:w-[35%] text-sm'>
                    <h1 className='text-2xl font-semibold text-center mb-4'>Reset Password</h1>
                    <p className='text-center mb-6 text-1xl'>Enter your register email address</p>
                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded border border-gray-400  bg-white'>
                        <input
                        onChange={e => setemail(e.target.value)}
                        value={email} 
                        className='bg-transparent outline-none' type="email" placeholder="Email id" required />
            
                    </div>
                    <button className='w-full !py-3  !bg-[#fb541b] text-white rounded mt-3'>Submit</button>
                </form>
            }
            {/* enter the otp*/}


            {!isotpsubmitted && isEmailsent &&
                
                    <form onSubmit={onsubmitotp} className='bg-state-900 p-8 rounded-lg shadow-lg sm:w-100 xl:w-[35%] text-sm'>
                        <h1 className=' text-2xl font-semibold text-center mb-4'> Reset password OTP</h1>
                        <p className='text-center mb-6  text-1xl'>Enter the 6-digit code send to your email id.</p>
                        <div className='flex justify-between mb-8' onPaste={handelpast}>
                            {Array(6).fill(0).map((_, index) => (
                                <input type="text" maxLength={1} key={index} required className='w-12 h-12 border border-gray-400 text-center text-xl rounded-md'
                                    ref={e => inputRefs.current[index] = e}
                                    onInput={(e) => handelInput(e, index)}
                                    onKeyDown={(e) => handeldown(e, index)} />
                            ))}

                        </div>
                        <button className='w-full !py-3 !bg-[#fb541b] text-white rounded'>Submit</button>
                    </form>
            }

            {isotpsubmitted && isEmailsent &&
                 <form onSubmit={onSubmitpassword} className='bg-state-900 p-8 rounded-lg shadow-lg sm:w-100 xl:w-[35%] text-sm'>
                 <h1 className=' text-2xl font-semibold text-center mb-4'>New Password</h1>
                 <p className='text-center mb-6  text-1xl'>Enter a new password below</p>
                 
                 <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded bg-white'>
                     <input 
                         type="password" 
                         placeholder='Password' 
                         className='bg-transparent outline-none text-black w-full' 
                         value={newpassword} 
                         onChange={(e) =>setnewpassword(e.target.value)} 
                         required 
                     />
                 </div>
     
                 <button type="submit" className='w-full !py-3 !bg-[#fb541b] text-white rounded mt-3'>
                     Submit
                 </button>
             </form>
            }

        </div >

    )
}

export default Reset_pass