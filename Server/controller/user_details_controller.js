import usermodel from "../model/mongobd_usermodel.js";
import Profile from "../model/userprofile.js";
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

export const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const profile = await Profile.findOne({ user:userId });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    res.json({ success: true, profile });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createProfile = async (req, res) => {
  try {
    const { userId, phone } = req.body;

    const exists = await Profile.findOne({ user: userId });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Profile already exists' });
    }

    const profile = new Profile({ user: userId, phone });
    await profile.save();
    res.status(201).json({ success: true, profile });
  } catch (error) {
    console.error("Create Profile Error:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const UpdateProfile = async (req, res) => {
  try {
    const { userId, phone } = req.body;
    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      { phone },
      { new: true }
    );
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    res.json({ success: true, message:"profile updated" });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const addAddress = async (req, res) => {
  try {
    const { userId, address } = req.body;
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    profile.addresses.push(address);
    await profile.save();

    res.status(201).json({ success: true, addresses: profile.addresses });
  } catch (error) {
    console.error("Add Address Error:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const { userId, address } = req.body;

    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    const targetAddress = profile.addresses.id(addressId);
    if (!targetAddress) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    Object.assign(targetAddress, address);
    await profile.save();

    res.json({ success: true, address: targetAddress });
  } catch (error) {
    console.error("Update Address Error:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const { userId } = req.body;

    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    profile.addresses = profile.addresses.filter(
      (addr) => addr._id.toString() !== addressId
    );
    await profile.save();

    res.json({ success: true, message: 'Address deleted' });
  } catch (error) {
    console.error("Delete Address Error:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
export const setDefaultBilling = async (req, res) => {
  try {
    const { userId, addressId } = req.body;

    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    profile.addresses = profile.addresses.map((addr) => ({
      ...addr.toObject(),
      isDefaultBilling: addr._id.toString() === addressId,
    }));

    await profile.save();

    res.json({ success: true, message: 'Default billing address updated' });
  } catch (error) {
    console.error("Set Default Billing Error:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};