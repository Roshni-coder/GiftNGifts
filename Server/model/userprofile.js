import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
 
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  required:true,
  },
  
  isDefaultBilling: {
    type: Boolean,
    default: false,
  },
});

const ProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  phone: String,
  name: String, 
  email: String,
  addresses: [AddressSchema],

 
});

const Profile=mongoose.model("profile",ProfileSchema)

export default Profile;