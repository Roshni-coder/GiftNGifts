import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { getuserdeta } from '../controller/user_details_controller.js';

const userouter = express.Router();

userouter.get('/data',userAuth,getuserdeta);

export default userouter;