import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import { LuTrash2 } from "react-icons/lu";
import { Button } from "@mui/material";
import { MyContext } from "../../App.jsx";
import { FiPlus } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";

function CategoryList() {
  const { setIsOpenAddProductPanel } = useContext(MyContext);
  const [categories, setCategories] = useState([]);
  const fileInputRefs = useRef({});

  useEffect(() => {
    fetchCategories();
    console.log(categories)
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/getcategories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`http://localhost:7000/api/deletecategory/${id}`);
        fetchCategories(); // Refresh category list
      } catch (error) {
        console.error("Error deleting category", error);
      }
    }
  };

  const handleUpdateCategoryName = async (id, newName) => {
    try {
      if (!newName) {
        alert("Category name cannot be empty");
        return;
      }

      await axios.put(`http://localhost:7000/api/updatecategory/${id}`, {
        categoryname: newName,
      });

      fetchCategories(); // Refresh list
    } catch (error) {
      console.error("Error updating category name:", error);
      alert("Failed to update category");
    }
  };

  const handleImageClick = (id) => {
    if (fileInputRefs.current[id]) {
      fileInputRefs.current[id].click();
    }
  };

  const handleImageChange = async (e, id) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.put(`http://localhost:7000/api/updatecategory/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      fetchCategories();
    } catch (error) {
      console.error("Error updating category image:", error);
      alert("Failed to update category image");
    }
  };

  return (
    <div className="products shadow-md rounded-md py-2 !px-5 bg-white">
      <div className="flex justify-between pt-3 items-center">
        <h4 className="text-[20px] text-left font-[600]">Category List</h4>
        <Button
          className="btn-blue !ml-auto"
          onClick={() => setIsOpenAddProductPanel({ open: true, model: "Add New Category" })}
        >
          <FiPlus className="!pr-1 text-[20px]" />
          Add New Category
        </Button>
      </div>
      <div className="relative pb-5 overflow-auto max-h-[550px] mt-5">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-500">
          <thead className="text-xs uppercase text-[12px] bg-gray-100 !text-[rgba(0,0,0,0.8)]">
            <tr>
              <th className="!px-6 py-4">Category Image</th>
              <th className="!px-6 py-4">Category Name</th>
              <th className="!px-6 py-4 whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td className="!px-6 py-4 relative">
                  <img
                    src={`http://localhost:7000/${category.image}`}
                    alt={category.categoryname}
                    className="w-[50px] h-[50px] object-cover rounded-full mx-auto cursor-pointer border-2 border-transparent hover:border-blue-500"
                    onClick={() => handleImageClick(category._id)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={(el) => (fileInputRefs.current[category._id] = el)}
                    onChange={(e) => handleImageChange(e, category._id)}
                  />
                </td>
                <td className="!px-6 py-4">
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    className="editable-category-name outline-none border border-transparent px-2 py-1 rounded hover:border-blue-400 focus:border-blue-600"
                    onBlur={(e) => handleUpdateCategoryName(category._id, e.target.innerText.trim())}
                  >
                    {category.categoryname}
                  </div>
                </td>
                <td className="!px-6 py-4">
                  <div className="flex justify-center items-center gap-3">
                    <Tooltip title="Edit Image">
  <span className="text-xl text-blue-500 cursor-default">
    <MdOutlineEdit />
  </span>
</Tooltip>

                    <Tooltip title="Delete">
                      <button
                        onClick={() => handleDeleteCategory(category._id)}
                        className="text-xl text-red-500"
                      >
                        <LuTrash2 />
                      </button>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoryList;
