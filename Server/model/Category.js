import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryname: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String, // Store image URL or filename
        required: true
    }
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
