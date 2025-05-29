import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import Admin from '../model/adminModel.js'

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.json({ success: false, message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ success: true, message: 'Registered successfully', token, name: newAdmin.name });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ success: true, message: 'Login successful', token, user: { name: admin.name } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


