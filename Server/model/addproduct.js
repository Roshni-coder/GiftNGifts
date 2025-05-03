import mongoose from "mongoose";
const addproductSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },

    description:{
        type:String,
        required:true,
    },

    categoryname: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    
      subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategory",
        required: true,
      },

    price:{
        type:Number,
        required:true,
    },

    oldprice:{
        type:Number,
        required:true,
    },
    
    discount:{
        type:Number,
        required:true,
    },
    
    ingredients:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    size:{
        type:String,
        required:true,
    },
    additional_details:{
        type:String,
        required:true,
    },
    images: [
        {
          url: {
            type: String,
            required: true
          },
          altText: {
            type: String,
            default: ''
          }
        }
      ]
})

const addproductmodel = mongoose.model('Product',addproductSchema)
export default addproductmodel;