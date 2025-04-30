import usermodel from "../model/mongobd_usermodel.js";


export const userlist=async(req,res)=>{
  try{
     const users=await usermodel.find() ;
     if(!users){
      return res.json({success:false,message:"no users found"});
     }
     return res.json({success:true,users});
  }

  catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}