import jwt from'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ success: false, message: 'Access Denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid Token' });
  }
};

export default authMiddleware;
