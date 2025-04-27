import mongoose from 'mongoose';

const sellerschema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String,required:true },
  image: { type: String},

  about: { type: String},
  available: { type: Boolean },
  phone:{type:Number},
  address: { type: Object },
  date: { type: Date, default: Date.now },  // Better type for date
 
}, { minimize: false });

const sellermodel = mongoose.models.seller || mongoose.model('seller', sellerschema);

export default sellermodel;
