import express from "express";
import {
  addProduct,
  getAllProducts,
  getProductById,
  filterProducts,
  deleteProduct,
  updateProduct,
} from "../controller/productController.js";

const router = express.Router();

router.post('/addproduct', addProduct);
router.get('/getproducts', getAllProducts);
router.get('/getproduct/:id', getProductById);
router.get('/filter', filterProducts);
router.delete('/deleteproduct/:id', deleteProduct);
router.put('/updateproduct/:id', updateProduct);

export default router;
