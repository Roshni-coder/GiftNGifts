import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import usermodel from '../model/mongobd_usermodel.js';
import transporter from '../config/nodemailer.js';
import Cart from '../model/cart.js'
import Wishlist from '../model/wishlist.js';
import Product from '../model/addproduct.js'
import Profile from '../model/userprofile.js';

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

        const profile = new Profile({
            user: user._id,
            phone: '', // optionally set default
            addresses: [],
            name:name,
            email:email
          });
          await profile.save();
      
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

        return res.json({ success: true ,token});

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

        return res.json({ success: true, token });
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
        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.json({ success: true, message: 'user not found' });
        }

        if (user.resetotp == '' || user.resetotp !== otp) {
            return res.json({ success: false, message: 'Invalis OTP' });
        }

        if (user.resetotpexpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP Expired' });
        }

        //all of the valid then reste password--
        const hashedpassword = await bcrypt.hash(newpassword, 10);
        user.password = hashedpassword;
        user.resetotp = '';
        user.resetotpexpireAt = 0;

        await user.save();

        return res.json({ success: true, message: 'password has been reset successfully' });


    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

//Addtocart api-----
export const Addtocart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    try {
        //  Validate productId exists in DB
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        //  Get or create cart
        let cart = await Cart.findOne({ userId });
        if (!cart) cart = new Cart({ userId, items: [] });

        //  Update quantity if already exists, else push new
        const existingItem = cart.items.find(item =>
            item.productId.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();

        //  Populate product details
        await cart.populate('items.productId');

        //  Safely map and ignore nulls
        const formatted = cart.items
            .filter(item => item.productId) // ignore bad/missing product refs
            .map(item => ({
              
                product: {
                    _id: item.productId._id,
                    name: item.productId.name,
                    image: item.productId.image,
                    price: item.productId.price
                },
                quantity:item.quantity
                
            }));

        res.json({ cart: formatted });
    } catch (err) {
        console.error("Error in Addtocart:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

//get the cart---
export const GetCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId }).populate("items.productId");

        if (!cart || cart.items.length === 0) {
            return res.json({ cart: [] });
        }

        const formatted = cart.items
            .filter(item => item.productId)
            .map(item => ({
                product: {
                    _id: item.productId._id,
                    title: item.productId.title,
                    price: item.productId.price,
                    oldprice: item.productId.oldprice,
                    discount: item.productId.discount,
                    brand: item.productId.brand,
                    image: item.productId.images[0]?.url || ''
                },
                quantity: item.quantity
            }));
        console.log("ffff", formatted)
        res.json({ cart: formatted });
    } catch (err) {
        console.error("Get Cart Error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

//Add to Wishlist------
export const AddToWishlist = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        let wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) wishlist = new Wishlist({ userId, products: [] });

        const alreadyInWishlist = wishlist.products.includes(productId);
        if (!alreadyInWishlist) {
            wishlist.products.push(productId);
        }

        await wishlist.save();
        await wishlist.populate("products");

        const formatted = wishlist.products.map(product => ({
            _id: product._id,
            title: product.title,
            price: product.price,
            oldprice: product.oldprice,
            discount: product.discount,
            brand: product.brand,
            image: product.images[0]?.url || ""
        }));

        res.json({ wishlist: formatted });
    } catch (err) {
        console.error("Add to Wishlist Error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

//get the wishlist----
export const GetWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const wishlist = await Wishlist.findOne({ userId }).populate("products");

        if (!wishlist || wishlist.products.length === 0) {
            return res.json({ wishlist: [] });
        }

        const formatted = wishlist.products.map(product => ({
            _id: product._id,
            title: product.title,
            price: product.price,
            oldprice: product.oldprice,
            discount: product.discount,
            brand: product.brand,
            image: product.images[0]?.url || ""
        }));

        res.json({ wishlist: formatted });
    } catch (err) {
        console.error("Get Wishlist Error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

//Dlelete from add to cart---
export const DeleteFromCart = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;
  
    try {
      // Find the cart for the user
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      // Filter out the product to remove
      const updatedItems = cart.items.filter(
        item => item.productId.toString() !== productId
      );
  
      // If item was not in the cart
      if (updatedItems.length === cart.items.length) {
        return res.status(404).json({ message: "Item not found in cart" });
      }
  
      cart.items = updatedItems;
  
      await cart.save();
      await cart.populate("items.productId");
  
      const formatted = cart.items
        .filter(item => item.productId)
        .map(item => ({
          product: {
            _id: item.productId._id,
            title: item.productId.title,
            price: item.productId.price,
            oldprice: item.productId.oldprice,
            discount: item.productId.discount,
            brand: item.productId.brand,
            image: item.productId.images[0]?.url || ""
          },
          quantity: item.quantity
        }));
  
      res.json({ message: "Item removed from cart", cart: formatted });
    } catch (err) {
      console.error("DeleteFromCart Error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
// delete wishlist product--
export const RemoveFromWishlist = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;
  
    try {
      const wishlist = await Wishlist.findOne({ userId });
  
      if (!wishlist) {
        return res.status(404).json({ message: "Wishlist not found" });
      }
  
      const updatedProducts = wishlist.products.filter(
        id => id.toString() !== productId
      );
  
      if (updatedProducts.length === wishlist.products.length) {
        return res.status(404).json({ message: "Item not found in wishlist" });
      }
  
      wishlist.products = updatedProducts;
  
      await wishlist.save();
      await wishlist.populate("products");
  
      const formatted = wishlist.products.map(product => ({
        product: {
          _id: product._id,
          title: product.title,
          price: product.price,
          oldprice: product.oldprice,
          discount: product.discount,
          brand: product.brand,
          image: product.images[0]?.url || ""
        }
      }));
  
      res.json({ message: "Item removed from wishlist", wishlist: formatted });
    } catch (err) {
      console.error("RemoveFromWishlist Error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

//Toggle cart------
export const ToggleCartQuantity = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;
  
    try {
      if (isNaN(quantity) || quantity < 1) {
        return res.status(400).json({ message: "Quantity must be at least 1" });
      }
  
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: "Product not found" });
  
      if (quantity > product.quantity) {
        return res.status(400).json({ message: "Exceeds available stock" });
      }
  
      const cart = await Cart.findOne({ userId });
      if (!cart) return res.status(404).json({ message: "Cart not found" });
  
      const item = cart.items.find(item => item.productId.toString() === productId);
      if (!item) return res.status(404).json({ message: "Product not in cart" });
  
      // Update quantity
      item.quantity = quantity;
  
      // Save and populate
      await cart.save();
      await cart.populate("items.productId"); // Ensure population is called AFTER save
  
      // Return full populated data
      res.status(200).json({
        cart: cart.items.map(item => ({
          product: item.productId, // fully populated product
          quantity: item.quantity,
          price: item.price, // if you added it
        })),
      });
    } catch (error) {
      console.error("Update Cart Error:", error);
      res.status(500).json({ message: "Server error" });
    }
 };
  

  

