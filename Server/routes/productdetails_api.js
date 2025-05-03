// routes/productRoutes.js
import express from 'express';
import Product from '../model/addproduct.js';
const router = express.Router();

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const cleanId = req.params.id.trim(); // remove any spaces/newlines
    const product = await Product.findById(cleanId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router
