import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import ordermodel from "../model/ordermodel.js";
import validator from "validator"
import sellermodel from "../model/sellermodel.js";
import addproductmodel from "../model/addproduct.js";
import {v2 as cloudinary} from "cloudinary"
import orderModel from "../model/order.js";

export const registerseller=async(req,res)=>{
try{
  const {name,email,password}=req.body

  if(!name || !password || !email){
  return res.json({success:false,message:"Missing Details"})
  }
  
  if(!validator.isEmail(email)){
    return res.json({success:false,message:"Enter a valid email"})
  }
  const existing =await sellermodel.findOne({email})
  if(existing){
    return res.json({success:false,message:"user allready exists"})
  }
  if (password.length<8){
    return res.json({success:false,message:"enter a strong password"})
  }

  const salt =await bcrypt.genSalt(10)
  const hashedpass=await bcrypt.hash(password,salt)
  
  const sellerdata={
    name,email,
    password:hashedpass
  }
  
  const newseller=new sellermodel(sellerdata)
  const seller=await newseller.save()
  
  const token=jwt.sign({id:seller._id},process.env.JWT_SECRET)
  return res.json({success:true,token,message:"registered succesfuly",name:name})
 }
catch(e){
   console.log(e)
 return   res.json({success:false,message:e.message})
}


}



// const Changeavailabilty = async (req, res) => {
//   try {
//     const { id } = req.body;
//     const sellerdata = await sellermodel.findById(id);

//     await sellermodel.findByIdAndUpdate(id, { available: !docdata.available });
//     res.json({ success: true, message: "Availability Changed" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

export const loginseller = async (req, res) => {
  try {
    const { email, password } = req.body;

    const seller = await sellermodel.findOne({ email });
    if (!seller) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const ismatch = await bcrypt.compare(password, seller.password);

    if (ismatch) {
      const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET);
      
      res.json({
        success: true,
        token,
        message: "Login Successful",
        user: {
          name: seller.name, // ✅ Send name here
          email: seller.email, // optional if you want
          id: seller._id      // optional if needed
        }
      });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export const sellerorders = async (req, res) => {
  try {
    const { sellerid } = req.body;
    const orders = await orderModel.find({ sellerid });
    if(!orders){
      return res.status(404).json({message:"no orders"})
    }
    return res.status(201).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const ordercomplete = async (req, res) => {
  try {
    const { sellerid, orderid } = req.body;
    const orderdata = await appointmentmodel.findById(orderid);

    if (orderdata && orderdata.sellerid === sellerid) {
      await ordermodel.findByIdAndUpdate(orderid, {
        completed: true,
      });
      return res.json({ success: true, message: "Order Completed" });
    } else {
      return res.json({ success: false, message: "Mark Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export const addproducts = async (req, res) => {
  try {
    console.log("body:", req.body);

    const { title, description, price, categoryname ,subcategory,oldprice,discount,ingredients,brand,additional_details,size} = req.body;

    const files = req.files;

    console.log("files:", req.files);

    if (!title || !description || !price || !categoryname || !subcategory || !oldprice || !discount || !ingredients || !brand || !additional_details || !size) 
      {
      return res.status(400).json({ message: 'Please provide all required fields with images.' });
    }

    // Upload each image to Cloudinary
    const uploadedImages = await Promise.all(
      files.map(file =>
        cloudinary.uploader.upload(file.path, { resource_type: "image" })
      )
    );

    // Extract only secure URLs
    const imageUrls = uploadedImages.map(img => ({
      url: img.secure_url,
      altText: title,
    }));

    const newProduct = new addproductmodel({
      title,
      description,
      price,
      categoryname,
      images: imageUrls,
      subcategory,oldprice,
      discount,ingredients,
      brand,additional_details,
      size
    });

    const savedProduct = await newProduct.save();

    return res.status(201).json({
      message: 'Product added successfully!',
      product: savedProduct,
    });

  } catch (err) {
    return res.status(500).json({
      error: 'Failed to add product',
      details: err.message,
    });
  }
};



export const getSellerProfile = async (req, res) => {
  try {
    const {sellerid } = req.body;
    
    let seller = await sellermodel.findById(sellerid);

    if (seller) {
      
    
      return res.status(200).json({success:true , seller });
    } 
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const updateSellerProfile = async (req, res) => {
  try {
    const { sellerid, name, email, phone } = req.body;

    // Find the seller by ID
    console.log(sellerid);
    let seller = await sellermodel.findById(sellerid);

    if (!seller) {
      return res.status(404).json({ success: false, message: "Seller not found" });
    }

    // Update the seller's fields
    seller.name = name || seller.name;
    seller.email = email || seller.email;
    seller.phone = phone || seller.phone;

    // Save the updated seller
    await seller.save();

    return res.status(200).json({ sucess: true, message: "Profile updated successfully", seller });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};