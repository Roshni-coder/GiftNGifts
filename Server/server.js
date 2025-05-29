import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from './config/mongobd.js';
import connectcloudinary from "./config/cloudinary.js";

// Import all routes
import router from './routes/auth_routes.js';
import userouter from "./routes/user_routes.js";
import productrouter from "./routes/product_routes.js";
import uploadrouter from "./routes/upload_routes.js";
import categoryrouter from "./routes/category_routes.js";
import subcategoryrouter from "./routes/subcategory_routes.js";
import sellerrouter from "./routes/sellerroutes.js";
import clientrouter from "./routes/clientroute.js";
import ProductDetails from "./routes/productdetails_api.js";
import paymetRoutes from '../Server/routes/paymentRoutes.js';
import feedbackRoutes from '../Server/routes/feedbackRoutes.js';
import adminRoutes from '../Server/routes/adminRoute.js'; // ✅ Correct import

const app = express();
const port = process.env.port || 7000;

connectDB();
connectcloudinary();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server or tools like Postman

    const allowedOrigins = ['http://localhost:5173','http://localhost:5174','http://localhost:5175', 'http://srv814093.hstgr.cloud'];

    const hostname = new URL(origin).hostname;

    if (
      allowedOrigins.includes(origin) ||
      hostname === 'ishisofttech.com' ||
      hostname.endsWith('.ishisofttech.com')
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// All API routes
app.use('/api/auth', router);
app.use('/api/user', userouter);
app.use('/api/product', productrouter);
app.use('/api', uploadrouter);
app.use('/uploads', express.static('uploads'));
app.use('/api', categoryrouter);
app.use('/api', subcategoryrouter);
app.use('/api/seller', sellerrouter);
app.use('/api/client', clientrouter);
app.use('/api/products', ProductDetails);
app.use('/api', paymetRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes); // ✅ FIXED LINE

// Optional favicon fix
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.listen(port, () => console.log(`Server started on port ${port}...`));
