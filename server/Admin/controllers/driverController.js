const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const DatauriParser = require('datauri/parser');
const path = require('path');
const Driver = require("../models/DriverModel");

// Initialize Cloudinary
cloudinary.config({
  cloud_name: 'dcukvioe2',
  api_key: '379337983562414',
  api_secret: 'Q08t_b6pQjJWFp8nXnhMf3-2hfA',
});

// Multer setup for image upload
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');

const SECRET_KEY = "mySecretKey123";

// Driver login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log(email);

  try {
    const driver = await Driver.findOne({ email });

    if (!driver) {
      return res
        .status(400)
        .json({ success: false, message: "Driver not found" });
    }

    const validPassword = await bcrypt.compare(password, driver.password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const { _id, name, } = driver;

    if (!_id || !name ) {
      return res
        .status(500)
        .json({ success: false, message: "Driver data is incomplete" });
    }

    const token = jwt.sign(
      { driverId: driver._id, email: driver.email },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      message: "Driver logged in successfully",
      token: token,
      driver: driver,
    });
  } catch (error) {
    console.error("Error in driver login:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



// Driver logout
exports.logout = (req, res) => {
  
};


// Get all drivers
exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get driver by ID
exports.getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};








// Create a new driver credentials
exports.createDriver = async (req, res) => {
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
    try {
      // Upload the image to Cloudinary in the "Drivers" folder
      const image = await cloudinary.uploader.upload(dataUri.content, {
        folder: "Drivers"
      });

      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide all required fields" });
      }

      const existingDriver = await Driver.findOne({ email });
      if (existingDriver) {
        return res.status(409).json({ message: "Driver Email already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create and save the new driver
      const newDriver = new Driver({
        name,
        email,
        password: hashedPassword,
        image: image.secure_url
      });

      await newDriver.save();
      res.status(201).json({ message: "Driver created successfully", driver: newDriver });
    } catch (error) {
      console.error("Error in creating driver:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};


// Update an driver
exports.updateDriver = async (req, res) => {
  try {
      const { email, password } = req.body;
      const driver = await Driver.findByIdAndUpdate(req.params.id, { email, password }, { new: true });
      if (!driver) {
          return res.status(404).json({ message: "Driver is not found" });
      }
      res.json(driver);
  } catch (error) {
      res.status(500).json({ message: "Internal server error" });
  }
};




// Delete an driver
exports.deleteDrivers = async (req, res) => {
  try {
      const driver = await Driver.findByIdAndRemove(req.params.id);
      if (!driver) {
          return res.status(404).json({ message: "Driver not found" });
      }
      res.json({ message: "Driver deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Internal server error" });
  }
};
