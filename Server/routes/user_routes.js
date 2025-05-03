import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { addAddress, createProfile, deleteAddress, getProfile, getuserdeta, updateAddress, UpdateProfile ,setDefaultBilling} from '../controller/user_details_controller.js';

const userouter = express.Router();

userouter.get('/data',userAuth,getuserdeta);
userouter.get('/profile',userAuth,getProfile);
userouter.post('/updateprofile',userAuth,UpdateProfile);
userouter.get('/profile',userAuth,getProfile);
userouter.get('/createprofile',userAuth,createProfile);
userouter.post('/addaddress',userAuth,addAddress);
userouter.put('/updateaddress/:addressId',userAuth,updateAddress);
userouter.delete('/deleteaddress/:addressId',userAuth,deleteAddress);
userouter.put('/setdefaultbilling/:addressId',userAuth, setDefaultBilling);

export default userouter;