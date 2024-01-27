const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const DatauriParser = require('datauri/parser');
const path = require('path');
const Category = require('../models/categoryModel');

// Initialize Cloudinary
cloudinary.config({
  cloud_name: 'dcukvioe2',
  api_key: '379337983562414',
  api_secret: 'Q08t_b6pQjJWFp8nXnhMf3-2hfA',
});


// Multer setup
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');

// Create a new category with image upload
exports.createCategory = async (req, res) => {
  try {
    multerUploads(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Image upload error' });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'Image not provided' });
      }

      const parser = new DatauriParser();
      const dataUri = parser.format(path.extname(req.file.originalname).toString(), req.file.buffer);
      const image = await cloudinary.uploader.upload(dataUri.content);

      const newCategory = new Category({
        name: req.body.name,
        description: req.body.description,
        image: image.secure_url,
      });

      const category = await newCategory.save();
      res.status(201).json(category);
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a category with image upload
exports.updateCategory = async (req, res) => {
  try {
    multerUploads(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Image upload error' });
      }

      let imageUrl = req.body.imageUrl;

      if (req.file) {
        const parser = new DatauriParser();
        const dataUri = parser.format(path.extname(req.file.originalname).toString(), req.file.buffer);
        const image = await cloudinary.uploader.upload(dataUri.content);
        imageUrl = image.secure_url;
      }

      const updatedCategory = {
        name: req.body.name,
        description: req.body.description,
        image: imageUrl,
        // Add other fields as needed
      };

      const category = await Category.findByIdAndUpdate(req.params.id, updatedCategory, { new: true });
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category);
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndRemove(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(204).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
