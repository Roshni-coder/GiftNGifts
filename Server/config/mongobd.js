import mongoose from "mongoose";

const connectDB = async ()=>{
    mongoose.connection.on('connected', ()=>console.log("Database Connected........"))
    await mongoose.connect(`${process.env.mongodb_url}`)
    console.log(`${process.env.mongodb_url}`)
};
export default connectDB;