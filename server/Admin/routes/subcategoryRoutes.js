const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');

// CRUD routes
router.get('/getAllSubCategories', subcategoryController.getAllSubCategories);
router.get('/getSubCategoryById/:id', subcategoryController.getSubCategoryById);
router.post('/createSubCategory', subcategoryController.createSubCategory);
router.put('/updateSubCategory/:id', subcategoryController.updateSubCategory);
router.delete('/deleteSubCategory/:id', subcategoryController.deleteSubCategory);

module.exports = router;