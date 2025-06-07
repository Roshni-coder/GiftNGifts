import addproductmodel from "../model/addproduct.js";

export const addProduct = async (req, res) => {
  try {
    const {
      title, description, categoryname, subcategory, price,
      oldprice, discount, ingredients, brand, size,
      additional_details, images,
    } = req.body;

    if (!title || !price) {
      return res.status(400).json({ success: false, message: "Please provide all the details" });
    }

    const newProduct = new addproductmodel({
      title, description, categoryname, subcategory, price,
      oldprice, discount, ingredients, brand, size,
      additional_details, images
    });

    await newProduct.save();
    res.status(201).json({ success: true, message: "Product added successfully!", data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await addproductmodel.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await addproductmodel.findById(id)
      .populate('categoryname', 'name')
      .populate('subcategory', 'name');

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const filterProducts = async (req, res) => {
  try {
    const { categoryname, minPrice, maxPrice, sort, discount } = req.query;
    const filter = {};

    if (categoryname) filter.categoryname = categoryname;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    if (discount) filter.discount = { $gte: parseFloat(discount) };

    let sortOption = {};
    if (sort === 'asc') sortOption.price = 1;
    if (sort === 'desc') sortOption.price = -1;

    const products = await addproductmodel.find(filter).sort(sortOption);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const del = await addproductmodel.findByIdAndDelete(id);
    res.json({ success: true, message: "Product deleted successfully", data: del });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await addproductmodel.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.status(200).json({ success: true, message: 'Product updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
