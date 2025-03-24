import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import usermodel from '../model/mongobd_usermodel.js';
import transporter from '../config/nodemailer.js';

// for register function----
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({
            success: false,
            message: 'Missing Details'
        });
    }
    try {
        const existinguser = await usermodel.findOne({ email })

        //check user exsit or not--
        if (existinguser) {
            return res.json({
                success: false,
                message: 'User already exists '
            });
        }

        const hashedpasswoed = await bcrypt.hash(password, 10);

        //create new user--- and save it --
        const user = new usermodel({ name, email, password: hashedpasswoed });
        await user.save();

        //create token------
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        //send welcome email--
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to ishisoft',
            text: `welcome to ishisoft website. your account has been created with email id: ${email}`
        }

        //sending a email-
        await transporter.sendMail(mailOption)

        return res.json({ success: true });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }

}


//for login function------
export const login = async (req, res) => {
    const { email, password } = req.body;

    //email and password are not enter by user----
    if (!email || !password) {
        return res.json({
            success: false,
            message: 'password and email required'
        });
    }
    try {
        const user = await usermodel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: 'invalis Email'
            })
        }

        //user password match or not ----
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({
                success: false,
                message: 'invalis password'
            })
        }

        //if password is matched then create token -----
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ success: true });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


//for logout functtion----
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'strict',
        })
        return res.json({ success: true, message: "Logged out" })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


//OTP  verify send by email---
export const sendverifyotp = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await usermodel.findById(userId);

        if (user.isAccountVerify) {
            res.json({ success: false, message: "Account Already Verified" });
        }

        //OTP generate----
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyotp = otp
        user.verifyotpexpAt = Date.now() + 24 * 60 * 60 * 1000
        //save the otp--
        await user.save();

        //send to the email----
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Your OTP is ${otp}. Verify your using this OTP.`
        }
        await transporter.sendMail(mailOption)

        res.json({ success: true, message: 'Verification OTP send on Email' })

    } catch (error) {
        res.json({ success: false, message: error.message });

    }
}


// OTP  with veryfing account----
export const verifyingEmail = async (req, res) => {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
        return res.json({ success: false, message: 'missing Details' });
    }
    try {
        const user = await usermodel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: 'user not found' });
        }

        if (user.verifyotp === '' || user.verifyotp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        if (user.verifyotpexpAt < Date.now()) {
            return res.json({ success: false, message: 'OTP expired' });
        }
        user.isAccountVerify = true;
        user.verifyotp = '';
        user.verifyotpexpAt = 0;
        await user.save();
        res.json({ success: true, message: 'Email Verified successfully' })

    } catch (error) {
        res.json({ success: false, message: error.message });

    }
}

//check if user is authenticated------
export const isAuthenticated = async (req, res) => {
    try {
        return res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

//send password reset OTP-------
export const sendResetpassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({
            success: true,
            message: 'Email is required'
        });
    }
    try {
        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: 'User not found'
            });
        }

        // Generate SIX-digit OTP------
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetotp = otp;
        user.resetotpexpireAt = Date.now() + 15 * 60 * 60 * 1000
        //save the otp--
        await user.save();

        //send to the email----
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Your OTP is ${otp}. Use this OTP to proceed with resetting your password.`
        }
        await transporter.sendMail(mailOption);

        return res.json({ success: true, message: 'OTP send to your email' })

    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

//Reset User password-----
export const resetpassword = async (req, res) => {
    const { email, otp, newpassword } = req.body;
    if (!email || !otp || !newpassword) {
        return res.json({ success: false, message: 'Email, OTP, and new password are required' });
    }
    try {
        const user = await usermodel.findOne({email});
        if(!user) {
            return res.json({success:true, message:'user not found'});
        }

        if(user.resetotp == '' || user.resetotp !== otp) {
            return res.json({success:false, message : 'Invalis OTP'});
        }
         
        if(user.resetotpexpireAt < Date.now()){
            return res.json({success:false, message: 'OTP Expired'});
        }

        //all of the valid then reste password--
        const hashedpassword = await bcrypt.hash(newpassword, 10);
        user.password = hashedpassword;
        user.resetotp='';
        user.resetotpexpireAt=0;

        await user.save();
        
        return res.json({success:true, message : 'password has been reset successfully'});


    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}