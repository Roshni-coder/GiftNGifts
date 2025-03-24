import usermodel from "../model/mongobd_usermodel.js";

//Get all user data after register or login all of aperaton------
export const getuserdeta = async (req,res)=>{
    try {
        const {userId} = req.body;
        const user = await usermodel.findById(userId);
        if(!user) {
            return res.json({success:false, message : 'user not found'});
        }
        res.json({
            success:true,
            userData: {
                name : user.name,
                isAccountVerify : user.isAccountVerify
            }
        })

    } catch (error) {
        res.json({success: false, message: error.message});
    }

}