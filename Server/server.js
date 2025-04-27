import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import connectDB from './config/mongobd.js';
import router from './routes/auth_routes.js';
import userRouter from "./routes/user_routes.js";
import productRouter from "./routes/product_routes.js";
import uploadRouter from "./routes/upload_routes.js";
import categoryRouter from "./routes/category_routes.js";
import subcategoryRouter from "./routes/subcategory_routes.js";
import connectCloudinary from "./config/cloudinary.js";
import sellerRouter from "./routes/sellerroutes.js";
import paymentRoutes from './routes/paymentrazorpay.js'; // ✅ Payment routes
import clientrouter from "../../GiftnGifts/Server/routes/productdetails_api.js";
import ProductDetails from '../../GiftnGifts/Server/routes/productdetails_api.js'
dotenv.config();

const app = express();
const port = process.env.PORT || 7000;

connectDB();
connectCloudinary();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/auth', router);
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api', uploadRouter);
app.use('/uploads', express.static('uploads'));
app.use('/api', categoryRouter);
app.use('/api', subcategoryRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/payment', paymentRoutes); // ✅ Payment route
app.use('/api',productRouter)
app.use("/api/client",clientrouter)
//app.use('/',(req,res)=>res.json({ message: "API working..." }));

//product Details----
app.use('/api/products',ProductDetails);

app.listen(port, () => console.log(`Server started on port ${port}.........`));
