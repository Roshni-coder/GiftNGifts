import express from "express";
import addproductmodel from "../model/addproduct.js";

const router = express.Router();

router.post('/addproduct',async(req,res)=>{
     try{
        const {title,description,categoryname,subcategory,price,oldprice,discount,ingredients,brand,size,additional_details,images} = req.body;

        if(!title || !price ){
                return res.status(400).json({success:false,message:"pleas provide all the details"})
        }

        const newProduct = new addproductmodel({title,description,categoryname,subcategory,price,oldprice,discount,ingredients,brand,size,additional_details,images})
        await newProduct.save()

        res.status(201).json({ success: true, message: "Product added successfully!", data: newProduct });

     }
     catch(error){
        res.status(500).json({success: false,message: "server error",error:error.message})
     }
})

router.get('/getproducts', async (req, res) => {
   try {
       const products = await addproductmodel.find({})
           
       res.status(200).json({ success: true, data: products });
   } catch (error) {
       res.status(500).json({ success: false, message: "Server error", error: error.message });
   }
});

router.get('/getproduct/:id', async (req, res) => {
   try {
     const { id } = req.params;
 
     const product = await addproductmodel.findById(id)
       .populate('categoryname', 'name')    // Only if categoryname is an ObjectId ref
       .populate('subcategory', 'name');    // Only if subcategory is an ObjectId ref
 
     if (!product) {
       return res.status(404).json({ success: false, message: "Product not found" });
     }
 
     res.status(200).json({ success: true, data: product });
   } catch (error) {
     res.status(500).json({ success: false, message: "Server error", error: error.message });
   }
 });
 router.get('/filter',async(req,res)=>{
   try{
       const {categoryname,minPrice,maxPrice,sort,discount} = req.query

       const filter ={};

       if(categoryname){
         filter.categoryname = categoryname
       }

       if(minPrice || maxPrice){
         filter.price ={}

          if(minPrice) filter.price.$gte= parseFloat(minPrice)
          if(maxPrice) filter.price.$lte = parseFloat(maxPrice)  
       }

       if(discount){
         filter.discount = {$gte:parseFloat(discount)}
       }

       let sortOption ={}
       if(sort ==='asc') sortOption.price = 1;
       if(sort === 'desc') sortOption.price = -1

       const product = await addproductmodel.find(filter).sort(sortOption)

       res.status(200).json({success:true,data:product})
   }
   catch(error){
       res.status(500).json({success:false,message:"server error",error:error.message})  
   }
})

router.delete('/deleteproduct/:id',async(req,res)=>{
   try {
      const {id} = req.params
      const del = await addproductmodel.findByIdAndDelete(id)
      res.json({ success: true, message: "Product deleted successfully", data: del });

   } catch (error) {
      res.status(500).json({success:false, message:'Server error',error:error.message})
   }
})

router.put('/updateproduct/:id',async(req,res)=>{
   try{
      const {id} = req.params
      const task = req.body

      const update = await addproductmodel.findByIdAndUpdate(id,{$set: task},{new:true})

      if(update){
         res.status(200).json({message:'updated',success:true})
      }
   }
   catch(error){
       res.status(500).json({success:false,message:error.message})
   }
})

export default router;