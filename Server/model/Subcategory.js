import mongoose from 'mongoose';

const SubcategorySchema = new mongoose.Schema({
    subcategory: { type: String, required: true, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true } // Reference to Category
});

const Subcategory = mongoose.model('Subcategory', SubcategorySchema);
export default Subcategory;
