
import addproductmodel from "../model/addproduct.js";
import Category from "../model/Category.js";

export const productlist=async(req,res)=>{
  try{

  const categories=await Category.find({});
  const products=await addproductmodel.find({});

  if(products.length==0){
    return res.status(404).json({message:"No products found in this category"})
  }

  res.status(200).json({products:products,categories:categories});


}

catch (err) {
  res.status(500).json({ error: 'Server error', details: err.message });
}

}

export const getAllProductsByCategory = async (req, res) => {
  try {
    const categories = await Category.find({});
    const result = [];

    for (const category of categories) {
      const products = await addproductmodel.find({ categoryname: category._id });
      result.push({
        category: category.categoryname,
        products,
      });
    }

    res.status(200).json({success:true,categories:result});
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};
