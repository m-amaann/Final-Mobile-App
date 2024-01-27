const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin'); 

// Middleware for verifying admin token
const verifyAdminToken = async (req, res, next) => {
  const token = req.header('x-auth-token'); 

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT secret here

    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({ message: 'Invalid token, admin not found' });
    }
    

    req.admin = admin;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = verifyAdminToken;
