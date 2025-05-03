// ⬇️ Full working code below (Only changes are marked clearly)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Button, Rating, FormControl, InputLabel } from '@mui/material';
import UploadImageBox from '../../Components/UploadBox/UploadImageBox';
import { MdClose, MdOutlineCloudUpload } from 'react-icons/md';

function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [images, setImages] = useState([]);

  const [Product, setProduct] = useState({
    title: "",
    description: "",
    categoryname: "",
    subcategory: "",
    price: "",
    oldprice: "",
    discount: "",
    ingredients: "",
    brand: "",
    size: "",
    additional_details: "",
    images: []
  });

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/getcategories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/getsubcategories');
      setSubcategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...Product, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name) => (event) => {
    setProduct({ ...Product, [name]: event.target.value });
  };

  const handleImageUpload = (files) => {
    const fileList = Array.from(files);
    setImages((prevImages) => [...prevImages, ...fileList]);
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: [...prevProduct.images, ...fileList],
    }));
  };
  

  const handleImageRemove = (indexToRemove) => {
    const updated = images.filter((_, i) => i !== indexToRemove);
    setImages(updated);
    setProduct((prev) => ({ ...prev, images: updated }));
  };

  const addproduct = async () => {
    try {
      const formData = new FormData();
  
      // Append each text field explicitly
      formData.append("title", Product.title);
      formData.append("description", Product.description);
      formData.append("price", Product.price);
      formData.append("oldprice", Product.oldprice);
      formData.append("discount", Product.discount);
      formData.append("ingredients", Product.ingredients);
      formData.append("brand", Product.brand);
      formData.append("additional_details", Product.additional_details);
      formData.append("size", Product.size);
      formData.append("categoryname", Product.categoryname);
      formData.append("subcategory", Product.subcategory);
      console.log("images",images)
      if(images.length===0){
        console.log("no image")
      }
      // Append image files
      images.forEach((img) => {
        formData.append("images", img); // Field name must match backend
      });
  
      const response = await axios.post(
        'http://localhost:7000/api/seller/addproducts',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
  
      console.log('Product added:', response.data);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error.response || error);
      alert('Failed to add product. Check the console for more details.');
    }
  };
  

  return (
    <section className="p-5 bg-gray-50">
      <form className="py-2 px-10">
        <div className="grid grid-cols-1 mb-3">
          <h3 className="text-[14px] font-[500] mb-1">Product Title</h3>
          <input
            type="text"
            name="title"
            value={Product.title}
            onChange={handleChange}
            className="w-full p-3 text-sm h-[40px] border bg-white"
          />
        </div>

        <div className="grid grid-cols-1 mb-3">
          <h3 className="text-[14px] font-[500] mb-1">Product Description</h3>
          <textarea
            name="description"
            value={Product.description}
            onChange={handleChange}
            className="w-full p-3 text-sm h-[100px] border bg-white"
          />
        </div>

        <div className="grid grid-cols-3 gap-5 mb-3">
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={Product.categoryname}
              onChange={handleSelectChange('categoryname')}
            >
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.categoryname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Subcategory</InputLabel>
            <Select
              value={Product.subcategory}
              onChange={handleSelectChange('subcategory')}
            >
              {subcategories.map((sub) => (
                <MenuItem key={sub._id} value={sub._id}>
                  {sub.subcategory}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div>
            <h3 className="text-[14px] font-[500] mb-1">Price</h3>
            <input
              type="number"
              name="price"
              value={Product.price}
              onChange={handleChange}
              className="w-full p-3 text-sm h-[40px] border bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 mb-3">
          <input
            type="number"
            name="oldprice"
            value={Product.oldprice}
            onChange={handleChange}
            placeholder="Old Price"
            className="col p-3 text-sm h-[40px] border bg-white"
          />
          <input
            type="text"
            name="discount"
            value={Product.discount}
            onChange={handleChange}
            placeholder="Discount"
            className="col p-3 text-sm h-[40px] border bg-white"
          />
          <input
            type="text"
            name="ingredients"
            value={Product.ingredients}
            onChange={handleChange}
            placeholder="Ingredients"
            className="col p-3 text-sm h-[40px] border bg-white"
          />
        </div>

        <div className="grid grid-cols-3 gap-5 mb-3">
          <input
            type="text"
            name="brand"
            value={Product.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="col p-3 text-sm h-[40px] border bg-white"
          />
          <input
            type="text"
            name="size"
            value={Product.size}
            onChange={handleChange}
            placeholder="Size"
            className="col p-3 text-sm h-[40px] border bg-white"
          />
          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1">Product Rating</h3>
            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
          </div>
        </div>

        <div className="grid grid-cols-1 mb-3">
          <input
            type="text"
            name="additional_details"
            value={Product.additional_details}
            onChange={handleChange}
            placeholder="Additional Details"
            className="p-3 bg-white border"
          />
        </div>
        <h1 className='tect-black font-bold text-2xl m-2'>Upload images</h1>
        {/* Upload Images */}
        <div className="flex flex-wrap gap-4 mb-8 text-gray-500">
         
  {images.map((img, index) => (
    <div key={index} className="relative">
      <img
        className="w-24 h-24 object-cover rounded border cursor-pointer"
        src={URL.createObjectURL(img)}
        alt={`preview-${index}`}
      />
      <button
        onClick={() => handleImageRemove(index)}
        className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full"
      >
        ✕
      </button>
    </div>
  ))}

  <label htmlFor="multi-img" className="cursor-pointer">
    <div className="w-24 h-24 flex items-center justify-center border-2 border-dashed bg-gray-100 text-sm text-center">
      + Upload
    </div>
  </label>

  <input
    id="multi-img"
    type="file"
    accept="image/*"
    multiple
    hidden
    onChange={(e) =>handleImageUpload(e.target.files)}
  />
</div>


        {/* Submit */}
        <Button
          type="button"
          className="flex items-center justify-center gap-2 btn-blue btn-lg w-[30%]"
          onClick={addproduct}
        >
          <MdOutlineCloudUpload className="text-[22px]" />
          Upload Product
        </Button>
      </form>
    </section>
  );
}

export default AddProduct;
