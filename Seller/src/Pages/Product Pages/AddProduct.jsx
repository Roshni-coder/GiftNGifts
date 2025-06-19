import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Button, FormControl, InputLabel } from '@mui/material';
import { MdOutlineCloudUpload } from 'react-icons/md';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import AddCategory from '../Category/AddCategory';
import AddSubCategory from '../Category/AddSubCategory';
import { Autocomplete, TextField } from '@mui/material';

function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [images, setImages] = useState([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openAddSubCategoryModal, setOpenAddSubCategoryModal] = useState(false);
  const stoken = localStorage.getItem('stoken') || "null";

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
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getcategories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getsubcategories`);
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

  useEffect(() => {
    const oldPrice = parseFloat(Product.oldprice);
    const discount = parseFloat(Product.discount);

    if (!isNaN(oldPrice) && !isNaN(discount)) {
      const discountedPrice = oldPrice - (oldPrice * discount / 100);
      setProduct((prevProduct) => ({
        ...prevProduct,
        price: discountedPrice.toFixed(2)
      }));
    }
  }, [Product.oldprice, Product.discount]);

  const addproduct = async () => {
    try {
      const formData = new FormData();
      Object.entries(Product).forEach(([key, value]) => {
        if (key !== "images") {
          formData.append(key, value);
        }
      });
      images.forEach((img) => formData.append("images", img));

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/seller/addproducts`,
        formData,
        { headers: { stoken } }
      );

      if (response.data.success) {
        alert('Product added successfully!');
      }

    } catch (error) {
      console.error('Error adding product:', error.response || error);
      alert('Failed to add product. Check the console for more details.');
    }
  };

  const handleOpenCategoryModal = () => setOpenAddCategoryModal(true);
  const handleCloseCategoryModal = () => {
    setOpenAddCategoryModal(false);
    fetchCategories();
  };

  const handleOpenSubCategoryModal = () => setOpenAddSubCategoryModal(true);
  const handleCloseSubCategoryModal = () => {
    setOpenAddSubCategoryModal(false);
    fetchSubcategories();
  };

  return (
    <section className="p-4 md:p-6 lg:p-10 bg-gray-50">
      <form className="mx-auto w-full md:w-[90%] lg:w-[70%]">
        <div className="mb-4">
          <label className="text-sm font-semibold mb-1 block">Product Title</label>
          <input
            type="text"
            name="title"
            value={Product.title}
            onChange={handleChange}
            className="w-full p-3 text-sm border bg-white"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-semibold mb-1 block">Product Description</label>
          <textarea
            name="description"
            value={Product.description}
            onChange={handleChange}
            className="w-full p-3 text-sm border bg-white h-24"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <Autocomplete
            fullWidth
            options={categories}
            getOptionLabel={(option) => option.categoryname}
            value={categories.find(cat => cat._id === Product.categoryname) || null}
            onChange={(event, newValue) => {
              setProduct({ ...Product, categoryname: newValue ? newValue._id : '' });
            }}
            renderInput={(params) => (
              <TextField {...params} label="Category" variant="outlined" />
            )}
          />

          <FormControl fullWidth>
            <InputLabel>Subcategory</InputLabel>
            <Select value={Product.subcategory} onChange={handleSelectChange('subcategory')}>
              {subcategories.map((sub) => (
                <MenuItem key={sub._id} value={sub._id}>
                  {sub.subcategory}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="mt-2">
            <Button variant="outlined" onClick={handleOpenSubCategoryModal}>
              + Create New Subcategory
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <Button variant="outlined" onClick={handleOpenCategoryModal}>
            + Create New Category
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="number"
            name="price"
            value={Product.price}
            readOnly
            placeholder="GnG Price"
            className="w-full p-3 text-sm border bg-gray-100"
          />
          <input
            type="number"
            name="oldprice"
            value={Product.oldprice}
            onChange={handleChange}
            placeholder="Old Price"
            className="p-3 text-sm border bg-white"
          />
          <input
            type="number"
            name="discount"
            value={Product.discount}
            onChange={handleChange}
            placeholder="Discount (%)"
            className="p-3 text-sm border bg-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            name="ingredients"
            value={Product.ingredients}
            onChange={handleChange}
            placeholder="Materials"
            className="p-3 text-sm border bg-white"
          />
          <input
            type="text"
            name="brand"
            value={Product.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="p-3 text-sm border bg-white"
          />
          <input
            type="text"
            name="size"
            value={Product.size}
            onChange={handleChange}
            placeholder="Size,Kg"
            className="p-3 text-sm border bg-white"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="additional_details"
            value={Product.additional_details}
            onChange={handleChange}
            placeholder="Additional Details"
            className="w-full p-3 bg-white border"
          />
        </div>

        <h1 className="text-black font-bold text-xl mb-3">Upload Images</h1>
        <div className="flex flex-wrap gap-4 mb-6">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img
                className="w-24 h-24 object-cover rounded border"
                src={URL.createObjectURL(img)}
                alt={`preview-${index}`}
              />
              <button
                type="button"
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
            onChange={(e) => handleImageUpload(e.target.files)}
          />
        </div>

        <div className="text-center">
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={addproduct}
            className="w-full md:w-[50%] flex justify-center gap-2 mx-auto"
          >
            <MdOutlineCloudUpload className="text-xl" />
            Upload Product
          </Button>
        </div>
      </form>

      <Modal
        open={openAddCategoryModal}
        onClose={handleCloseCategoryModal}
        aria-labelledby="add-category-modal"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded shadow-lg w-[90%] sm:w-[500px]">
          <AddCategory onSuccess={handleCloseCategoryModal} />
        </Box>
      </Modal>

      <Modal
        open={openAddSubCategoryModal}
        onClose={handleCloseSubCategoryModal}
        aria-labelledby="add-subcategory-modal"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded shadow-lg w-[90%] sm:w-[500px]">
          <AddSubCategory onSubCategoryAdded={handleCloseSubCategoryModal} />
        </Box>
      </Modal>
    </section>
  );
}

export default AddProduct;