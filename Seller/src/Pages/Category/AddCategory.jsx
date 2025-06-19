import React, { useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { Button } from "@mui/material";
import axios from "axios";

function AddCategory({ onClose }) {
  const [category, setCategory] = useState({
    categoryname: "",
    image: null,
  });
  const [preview, setPreview] = useState("");

  const handleCategoryChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategory({ ...category, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

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
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/addcategory`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert(response.data.message || "Category added successfully!");
      setCategory({ categoryname: "", image: null });
      setPreview("");

      // Optional close modal from parent (like AddProduct)
      if (onClose) onClose();

    } catch (error) {
      console.error("Error adding category:", error);
      alert(error.response?.data?.message || "Failed to add category");
    }
  };

  return (
    <section className="p-4 bg-white">
      <form className="w-full" onSubmit={addCategory}>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Category Name</label>
          <input
            type="text"
            name="categoryname"
            value={category.categoryname}
            onChange={handleCategoryChange}
            className="w-full p-2 border rounded-md text-sm"
            placeholder="Enter category name"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Category Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-[100px] h-[100px] object-cover rounded-md border"
            />
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => onClose && onClose()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<MdOutlineCloudUpload />}
          >
            Upload Category
          </Button>
        </div>
      </form>
    </section>
  );
}

export default AddCategory;