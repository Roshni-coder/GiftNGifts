import express from 'express';
import Subcategory from '../model/Subcategory.js';
import Category from '../model/Category.js'; // Assuming you have a Category model

const router = express.Router();

// Add a new subcategory
router.post('/addsubcategory', async (req, res) => {
    try {
        console.log("Received request body:", req.body);
        const { subcategory, categoryId } = req.body;

        if (!subcategory || !categoryId) {
            return res.status(400).json({ success: false, message: "Subcategory name and Category ID are required" });
        }

        const existingSubcategory = await Subcategory.findOne({ subcategory });
        if (existingSubcategory) {
            return res.status(400).json({ success: false, message: "Subcategory already exists" });
        }

        const newSubcategory = new Subcategory({ subcategory, category: categoryId });
        await newSubcategory.save();

        res.status(201).json({ success: true, message: "Subcategory added successfully!", subcategory: newSubcategory });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Failed to add subcategory" });
    }
});

// Get all subcategories with category name and image
router.get('/getsubcategories', async (req, res) => {
    try {
        const subcategories = await Subcategory.find().populate('category', 'categoryname image'); // Fetch category name & image
        res.status(200).json(subcategories);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch subcategories" });
    }
});

// Update a subcategory
router.put('/updatesubcategory/:id', async (req, res) => {
    try {
        const { subcategory } = req.body;

        if (!subcategory) {
            return res.status(400).json({ success: false, message: "Subcategory name is required" });
        }

        const updatedSubcategory = await Subcategory.findByIdAndUpdate(
            req.params.id,
            { subcategory },
            { new: true }
        );

        if (!updatedSubcategory) {
            return res.status(404).json({ success: false, message: "Subcategory not found" });
        }

        res.status(200).json({ success: true, message: "Subcategory updated successfully!", subcategory: updatedSubcategory });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Failed to update subcategory" });
    }
});


// Delete a subcategory
router.delete('/deletesubcategory/:id', async (req, res) => {
    try {
        const deletedSubcategory = await Subcategory.findByIdAndDelete(req.params.id);

        if (!deletedSubcategory) {
            return res.status(404).json({ success: false, message: "Subcategory not found" });
        }

        res.status(200).json({ success: true, message: "Subcategory deleted successfully!" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Failed to delete subcategory" });
    }
});

export default router;
