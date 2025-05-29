import express from 'express';
const router = express.Router();
import { registerAdmin, loginAdmin } from '../controller/adminController.js';

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

export default router;
