import express from 'express';
const router = express.Router();
import { registerAdmin, loginAdmin } from '../controller/admincontroller.js';

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

export default router;
