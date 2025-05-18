import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import { LuTrash2 } from "react-icons/lu";
import { Button } from "@mui/material";
import { MyContext } from "../../App.jsx";
import { FiPlus } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";
import SearchBox from "../../Components/SearchBox/SearchBox.jsx";
import Progress from "../../Components/Progress/Progress.jsx";
import { Link } from "react-router-dom";

function ProductList() {
  const { setIsOpenAddProductPanel } = useContext(MyContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatetask, setUpdatetask] = useState({});

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/getproducts");
      setProducts(response.data.data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    console.log(categories);
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/api/getcategories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };
  useEffect(() => {
    fetchProducts();
    console.log(products);
  }, []);

  const removeproduct = async (_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:7000/api/deleteproduct/${_id}`
      );
      if (response.data.success) {
        setProducts(products.filter((product) => product._id !== _id));
      } else {
        alert("Cannot delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const update = async (_id) => {
    if (!updatetask[_id] || Object.keys(updatetask[_id]).length === 0) {
      alert("No changes detected for update.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:7000/api/updateproduct/${_id}`,
        updatetask[_id]
      );
      if (response.data.success) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === _id ? { ...product, ...updatetask[_id] } : product
          )
        );
        setUpdatetask((prev) => ({ ...prev, [_id]: {} }));
        alert("Product updated successfully!");
      } else {
        alert("Update failed");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    fetchSubcategories();
    console.log(subcategories);
  }, []);

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/api/getsubcategories"
      );
      setSubcategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };
  const getCategoryNameById = (id) => {
    const category = categories.find((cat) => cat._id === id);
    return category ? category.categoryname : "Not found";
  };
  const getSubCategoryNameById = (id) => {
    const sub = subcategories.find((cat) => cat._id === id);
    return sub ? sub.subcategory : "Not found";
  };
  const handleupdate = (id, value, field) => {
    setUpdatetask((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  return (
    <>
      <div className="products shadow-md rounded-md py-2 !px-5 bg-white">
        <h2 className="text-[25px] py-1 text-left font-[600]">Products List</h2>
        <div className="flex items-center py-1 justify-between">
          <div className="col w-[80%]">
            <SearchBox />
          </div>
          <div className="col w-[15%] pl-3">
            <Button
              className="btn-blue !ml-auto"
              onClick={() =>
                setIsOpenAddProductPanel({ open: true, model: "Add Product" })
              }
            >
              <FiPlus className="!pr-1 text-[20px]" />
              Add Product
            </Button>
          </div>
        </div>

        <div className="relative pb-5 overflow-auto max-h-[550px] mt-5">
          <table className="w-full text-sm text-center text-gray-500 dark:text-gray-500">
            <thead className="text-xs uppercase text-[12px] bg-gray-100 !text-[rgba(0,0,0,0.8)]">
              <tr>
                <th className="!px-6 py-4">Products</th>
                <th className="!px-6 py-4 whitespace-nowrap">Category</th>
                <th className="!px-6 py-4 whitespace-nowrap">Sub Category</th>
                <th className="!px-6 py-4 whitespace-nowrap">Price</th>
                <th className="!px-6 py-4 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-4 text-center">
                    <Progress />
                  </td>
                </tr>
              ) : (
                products.map((product, index) => (
                  <tr key={product._id} className="border-b border-gray-200 ">
                    <td className="px-6  py-2 cursor-pointer border border-gray-100">
                      <Link to="" style={{ textDecoration: "none" }}>
                        <div className="flex  !w-[100%] items-center gap-4 m-auto ">
                          <div className="img !w-[65px] !h-[65px] rounded-md overflow-hidden">
                            <img
                              src={product.images[0]?.url}
                              className="w-full h-full object-cover"
                              alt="Product"
                            />
                          </div>
                          <div className="info !w-[75%] text-left">
                            <h3
                              className="!font-[600] text-[13px] text-black"
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) =>
                                handleupdate(
                                  product._id,
                                  e.target.innerText,
                                  "title"
                                )
                              }
                            >
                              {product.title}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-2 border border-gray-100 "
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        handleupdate(
                          product._id,
                          e.target.innerText,
                          "categoryname"
                        )
                      }
                    >
                      {getCategoryNameById(product.categoryname)}
                    </td>
                    <td className="px-6 py-2 border border-gray-100"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        handleupdate(
                          product._id,
                          e.target.innerText,
                          "subcategory"
                        )
                      }
                    >
                      {getSubCategoryNameById(product.subcategory)}
                    </td>
                    <td className="px-6 py-2 border border-gray-100">
                      <div className="flex items-center gap-2 flex-row items-center justify-center">
                        <span
                          className="newPrice text-black text-[15px] font-[600]"
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleupdate(
                              product._id,
                              e.target.innerText.replace("₹", ""),
                              "price"
                            )
                          }
                        >
                          ₹{product.price}
                        </span>
                        <span
                          className="oldPrice line-through text-gray-500 text-[14px] font-[500]"
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleupdate(
                              product._id,
                              e.target.innerText.replace("₹", ""),
                              "oldprice"
                            )
                          }
                        >
                          ₹{product.oldprice}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-2 border border-gray-100">
                      <div className="flex items-center justify-center gap-2">
                        <Tooltip title="Update">
                          <button
                            className="text-blue-600 text-[18px]"
                            onClick={() => update(product._id)}
                          >
                            <MdOutlineEdit />
                          </button>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <button
                            className="text-red-600 text-[18px]"
                            onClick={() => removeproduct(product._id)}
                          >
                            <LuTrash2 />
                          </button>
                        </Tooltip>
                        <Tooltip title="Preview">
                          <button className="text-green-600 text-[18px]">
                            <FaRegEye />
                          </button>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ProductList;
