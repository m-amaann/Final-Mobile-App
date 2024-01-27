const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');


router.post('/createReview', reviewController.createReview);
router.get('/getAllReviews', reviewController.getAllReviews);
router.get('/product/:productId', reviewController.getProductReviews);
router.get('/order/:orderId', reviewController.fetchReviewsForOrder);

module.exports = router;
