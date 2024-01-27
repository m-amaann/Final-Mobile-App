const DatauriParser = require("datauri/parser");
const path = require("path");
const SubCategory = require("../models/subcategoryModal");


// Create a new category
exports.createSubCategory = async (req, res) => {
  try {
    const newSubCategory = new SubCategory({
      name: req.body.name,
      category: req.body.category,
    });

    const subcategory = await newSubCategory.save();
    res.status(201).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



// Update a subcategory
exports.updateSubCategory = async (req, res) => {
  try {
    const subcategoryId = req.params.id;
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      subcategoryId,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedSubCategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.status(200).json(updatedSubCategory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};




// Get all subcategories
exports.getAllSubCategories = async (req, res) => {
    try {
      const subcategories = await SubCategory.find().populate('category');
      res.status(200).json(subcategories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  


  // Get subcategory by ID
  exports.getSubCategoryById = async (req, res) => {
    try {
      const subcategoryId = req.params.id;
      const subcategory = await SubCategory.findById(subcategoryId);
      if (!subcategory) {
        return res.status(404).json({ message: 'Subcategory not found' });
      }
      res.status(200).json(subcategory);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  


  // Delete subcategory by ID
  exports.deleteSubCategory = async (req, res) => {
    try {
      const subcategoryId = req.params.id;
      const deletedSubCategory = await SubCategory.findByIdAndRemove(subcategoryId);
      if (!deletedSubCategory) {
        return res.status(404).json({ message: 'Subcategory data not found' });
      }
      res.status(204).json({ message: 'Subcategory deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };  