const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// CRUD routes
router.get('/getProductById/:id', productController.getProductById);
router.post('/createProduct', productController.createProduct);
router.put('/updateProduct/:id', productController.updateProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);
router.get('/getAllProducts', productController.getAllProducts);

router.get('/getNewArrivalProducts', productController.getNewArrivalProducts);
router.get('/getPopularProducts', productController.getPopularProducts);
router.get('/getTopSaleProducts', productController.getTopSaleProducts);

router.get('/products/count', productController.getProductsCount);

module.exports = router;