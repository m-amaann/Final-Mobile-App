const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const DatauriParser = require('datauri/parser');
const path = require('path');

// Initialize Cloudinary
cloudinary.config({
  cloud_name: 'dcukvioe2',
  api_key: '379337983562414',
  api_secret: 'Q08t_b6pQjJWFp8nXnhMf3-2hfA',
});

// Multer setup for image upload
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');


// Admin login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try 
  {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECERT_KEY);

    res.status(200).json({
      message: "Successfully logged in",
      admin: { email: admin.email, _id: admin._id, name: admin.name },
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error logging in" });
  }
};


// Admin logout
exports.logout = (req, res) => {
  res.json({
    message: "Admin successfully logged out"
  });
};


// Get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get admin by ID
exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};



// Create a new admin
exports.createAdmin = async (req, res) => {
  multerUploads(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "Image upload error" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image not provided" });
    }

    const parser = new DatauriParser();
    const dataUri = parser.format(path.extname(req.file.originalname).toString(), req.file.buffer);

    // Upload the image to Cloudinary
    const image = await cloudinary.uploader.upload(dataUri.content);

    const { name, email, username, password } = req.body;
    
    if (!name || !email || !password || !username) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const existingAdminEmail = await Admin.findOne({ email });
    if (existingAdminEmail) {
      return res.status(409).json({ message: "Admin Email already exists" });
    }

    const existingAdminUsername = await Admin.findOne({ username });
    if (existingAdminUsername) {
      return res.status(409).json({ message: "Admin Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      name,
      email,
      username,
      password: hashedPassword,
      image: image.secure_url
    });
    await admin.save();

    res.status(201).json({ message: "Admin created successfully" });
  });
};



// Update an admin
exports.updateAdmin = async (req, res) => {
  try {
      const { email, password } = req.body;
      const admin = await Admin.findByIdAndUpdate(req.params.id, { email, password }, { new: true });
      if (!admin) {
          return res.status(404).json({ message: "Admin not found" });
      }
      res.json(admin);
  } catch (error) {
      res.status(500).json({ message: "Internal server error" });
  }
};




// Delete an admin
exports.deleteAdmin = async (req, res) => {
  try {
      const admin = await Admin.findByIdAndRemove(req.params.id);
      if (!admin) {
          return res.status(404).json({ message: "Admin not found" });
      }
      res.json({ message: "Admin deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Internal server error" });
  }
};
