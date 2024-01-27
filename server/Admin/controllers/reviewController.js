const bcrypt = require("bcryptjs");
const multer = require('multer');
const DatauriParser = require('datauri/parser');
const path = require('path');
const Review = require('../models/Review'); 


// new review
exports.createReview = async (req, res) => {
    try {
        const { userId, productId, orderId, rating, review } = req.body;

        // Create a new review
        const newReview = await Review.create({ 
            userId, 
            productId, 
            orderId, 
            rating, 
            review 
        });

        res.status(201).json({ message: 'Review created successfully', newReview });
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Error creating' });
    }
};


// Fetch all reviews
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('userId', 'name image');
        res.json(reviews);
    } catch (error) {
        console.error('Error retrieving review', error);
        res.status(500).json({ message: 'Error fetching all reviews' });
    }
};


// Fetch all reviews for a specific product
exports.getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await Review.find({ productId }).populate('userId', 'name image');
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching product reviews:', error);
        res.status(500).json({ message: 'Error fetching product reviews' });
    }
};

// Fetch reviews for a specific order
exports.fetchReviewsForOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const reviews = await Review.find({ orderId }).populate('userId', 'name image');
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching order reviews:', error);
        res.status(500).json({ message: 'Error fetching order reviews' });
    }
};
