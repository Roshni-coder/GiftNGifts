import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import { LuTrash2 } from "react-icons/lu";
import { Button, TextField, IconButton } from "@mui/material";
import { MyContext } from "../../App.jsx";
import { FiPlus } from "react-icons/fi";
import { MdOutlineEdit, MdSaveAlt, MdClose } from "react-icons/md";

function CategoryList() {
  const { setIsOpenAddProductPanel } = useContext(MyContext);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const fileInputRefs = useRef({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getcategories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/deletecategory/${id}`);
        fetchCategories();
      } catch (error) {
        console.error("Error deleting category", error);
      }
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
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/updatecategory/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchCategories();
    } catch (error) {
      console.error("Error updating category image:", error);
      alert("Failed to update category image");
    }
  };

  const startEdit = (category) => {
    setEditingId(category._id);
    setEditName(category.categoryname);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  const saveEdit = async (id) => {
    try {
      if (!editName.trim()) {
        alert("Category name cannot be empty");
        return;
      }
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/updatecategory/${id}`, {
        categoryname: editName.trim(),
      });
      cancelEdit();
      fetchCategories();
    } catch (error) {
      console.error("Error updating category name:", error);
      alert("Failed to update category");
    }
  };

  return (
    <div className="products shadow-md rounded-md py-2 px-4 sm:px-5 bg-white">
      <div className="flex flex-col sm:flex-row justify-between pt-3 items-center gap-2">
        <h4 className="text-[18px] sm:text-[20px] font-semibold text-center sm:text-left">
          Category List
        </h4>
        <Button
          className="btn-blue"
          onClick={() => setIsOpenAddProductPanel({ open: true, model: "Add New Category" })}
        >
          <FiPlus className="pr-1 text-[20px]" />
          Add New Category
        </Button>
      </div>

      <div className="relative overflow-auto mt-5 max-h-[600px]">
        <table className="min-w-[600px] w-full border border-gray-300 text-sm text-center text-gray-500">
          <thead className="text-xs uppercase bg-gray-100 text-gray-800">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id} className="border border-gray-200 border-gray-200">
                <td className="px-6 py-2 border border-gray-200">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${cat.image}`}
                    alt="Category"
                    className="w-[50px] h-[50px] object-cover rounded-full mx-auto cursor-pointer"
                    onClick={() => handleImageClick(cat._id)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={(el) => (fileInputRefs.current[cat._id] = el)}
                    onChange={(e) => handleImageChange(e, cat._id)}
                  />
                </td>
                <td className="px-6 py-2 border border-gray-200">
                  {editingId === cat._id ? (
                    <TextField
                      size="small"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      fullWidth
                    />
                  ) : (
                    <span className="text-gray-700 font-medium">{cat.categoryname}</span>
                  )}
                </td>
                <td className="px-6 py-2 border border-gray-200">
                  <div className="flex items-center justify-center gap-2">
                    {editingId === cat._id ? (
                      <>
                        <Tooltip title="Save">
                          <IconButton onClick={() => saveEdit(cat._id)}>
                            <MdSaveAlt className="text-gray-500" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel">
                          <IconButton onClick={cancelEdit}>
                            <MdClose className="text-gray-500" />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : (
                      <>
                        <Tooltip title="Edit">
                          <IconButton onClick={() => startEdit(cat)}>
                            <MdOutlineEdit className="text-gray-500" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton onClick={() => handleDeleteCategory(cat._id)}>
                            <LuTrash2 className="text-gray-500" />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
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
