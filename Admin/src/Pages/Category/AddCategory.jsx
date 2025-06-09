import React, { useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { Button } from "@mui/material";
import axios from "axios";

function AddCategory() {
  const [category, setCategory] = useState({
    categoryname: "",
    image: null,
  });
  const [preview, setPreview] = useState("");

  // Handle text input
  const handleCategoryChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCategory({ ...category, image: file });
    setPreview(URL.createObjectURL(file));
  };

  // Submit form
  const addCategory = async (e) => {
    e.preventDefault();

    if (!category.categoryname.trim() || !category.image) {
      alert("Please enter category name and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("categoryname", category.categoryname.trim());
    formData.append("image", category.image);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/addcategory`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message || "Category added successfully!");
      setCategory({ categoryname: "", image: null });
      setPreview("");
    } catch (error) {
      console.error("Error adding category:", error);
      alert(error.response?.data?.message || "Failed to add category");
    }
  };

  return (
    <section className="p-5 bg-gray-50 min-h-[80vh] flex justify-start items-start">
      <form className="w-full max-w-xl py-2 px-6">
        <div className="grid grid-cols-1 mb-3">
          <div className="w-full sm:w-1/2">
            <h3 className="text-[14px] font-[500] mb-2">Category Name</h3>
            <input
              type="text"
              name="categoryname"
              value={category.categoryname}
              onChange={handleCategoryChange}
              className="w-full p-3 text-sm h-[40px] border border-[rgba(0,0,0,0.4)] bg-white rounded-md"
              placeholder="Enter category name"
            />
          </div>
        </div>

        <div className="uploadimg w-full p-2 px-1">
          <h3 className="font-[600] text-[18px] mb-2">Category Image</h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full  text-sm h-[40px] py-2  rounded-md "
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 max-w-[100px] max-h-[100px] object-cover rounded-md"
            />
          )}
        </div>

        <br />
        <Button
          className="flex items-center justify-center gap-2 btn-blue btn-lg w-[160px] sm:w-[180px] md:w-[200px]"
          onClick={addCategory}
          type="submit"
        >
          <MdOutlineCloudUpload className="text-[22px]" />
          Upload Category
        </Button>
      </form>
    </section>
  );
}

export default AddCategory;
