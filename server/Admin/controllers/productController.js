const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const DatauriParser = require("datauri/parser");
const path = require("path");
const Product = require("../models/productModel");
const Settings = require("../models/SettingsModel");

// Initialize Cloudinary
cloudinary.config({
  cloud_name: "dcukvioe2",
  api_key: "379337983562414",
  api_secret: "Q08t_b6pQjJWFp8nXnhMf3-2hfA",
});

// Multer setup
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single("imageUrl");

// Create a new product with image upload
exports.createProduct = async (req, res) => {
  try {
    multerUploads(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: "Image upload error" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Image not provided" });
      }

      const parser = new DatauriParser();
      const dataUri = parser.format(
        path.extname(req.file.originalname).toString(),
        req.file.buffer
      );

      // Upload the image to Cloudinary
      const image = await cloudinary.uploader.upload(dataUri.content);

      const {
        name,
        description,
        category,
        price,
        discountprice,
        stockQuantity,
        sizes,
        colors,
        popularproducts,
        topsales,
        newarrival,
      } = req.body;

      console.log(req.body)

      const newProduct = new Product({
        name,
        description,
        category,
        imageUrl: image.secure_url,
        price,
        discountprice,
        stockQuantity,
        sizes,
        colors,
        popular: popularproducts,
        topSale: topsales,
        newArrival: newarrival,
      });

      // Add new product record into DB
      const product = await newProduct.save();

      res.status(201).json(product);
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update a product with image upload
exports.updateProduct = async (req, res) => {
  try {
    multerUploads(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: "Image upload error" });
      }

      let imageUrl = req.body.imageUrl;

      if (req.file) {
        const parser = new DatauriParser();
        const dataUri = parser.format(
          path.extname(req.file.originalname).toString(),
          req.file.buffer
        );
        const image = await cloudinary.uploader.upload(dataUri.content);
        imageUrl = image.secure_url;
      }

      const {
        name,
        description,
        category,
        price,
        discountprice,
        stockQuantity,
        sizes,
        colors,
      } = req.body;

      let updatedProduct = {
        name,
        description,
        category,
        price,
        discountprice,
        stockQuantity,
        sizes,
        colors: colors.join(","),
      };

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        updatedProduct,
        { new: true }
      );
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// Get all products
exports.getAllProducts = async (req, res) => {
  try 
  {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } 
  catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(204).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// New Arrival products
exports.getNewArrivalProducts = async (req, res) => {
  try {
    const settings = await Settings.findOne();

    if (settings.newArrival) {
      const products = await Product.find({ newArrival: true })
        .sort({ createdAt: -1 })
        .populate("category");
      res.status(200).json(products);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Popular products
exports.getPopularProducts = async (req, res) => {
  try {
    const settings = await Settings.findOne();

    if (settings.popular) {
      const products = await Product.find({ popular: true })
        .sort({ someSortField: -1 })
        .populate("category");
      res.status(200).json(products);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Top sales products
exports.getTopSaleProducts = async (req, res) => {
  try {
    const settings = await Settings.findOne();

    if (settings.topSale) {
      const products = await Product.find({ topSale: true })
        .sort({ someSortField: -1 })
        .populate("category");
      res.status(200).json(products);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



// product total count 
exports.getProductsCount = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    res.status(200).json({ count: productCount });
  } catch (error) {
    console.error("Error getting product count: ", error);
    res.status(500).json({ message: "Server error" });
  }
};