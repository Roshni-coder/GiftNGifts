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
      const response = await axios.post("http://localhost:7000/api/addcategory", formData, {
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
    <section className="p-5 bg-gray-50">
      <form className="h-[80vh] py-2 px-10">
        <div className="grid grid-cols-1 mb-3">
          <div className="col w-[50%]">
            <h3 className="text-[14px] font-[500] mb-2">Category Name</h3>
            <input
              type="text"
              name="categoryname"
              value={category.categoryname}
              onChange={handleCategoryChange}
              className="w-full p-3 text-sm h-[40px] border border-[rgba(0,0,0,0.4)] bg-white"
            />
          </div>
        </div>

        <div className="uploadimg w-full p-2 px-1">
          <h3 className="font-[600] text-[18px]">Category Image</h3>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-3 text-sm h-[40px]" />
          {preview && <img src={preview} alt="Preview" width="100" height="100" className="mt-2" />}
        </div>

        <br />
        <Button className="flex items-center justify-center gap-2 btn-blue btn-lg w-[16%]" onClick={addCategory}>
          <MdOutlineCloudUpload className="text-[22px]" />
          Upload Category
        </Button>
      </form>
    </section>
  );
}

export default AddCategory;
