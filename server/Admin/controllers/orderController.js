const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const DatauriParser = require('datauri/parser');
const path = require('path');
const Product = require("../models/productModel");


const updateProductQuantity = async (productId, quantityToReduce) => {
    try {
        const product = await Product.findById(productId);

        if (!product) {
            throw new Error('Product not found');
        }

        // Update the product quantity
        product.stockQuantity -= quantityToReduce;


        // Save the updated product
        await product.save();
    } catch (error) {
        console.error('Error updating product quantity:', error);
        throw error;
    }
};

exports.orders = async (req, res) => {
    try {
        const newOrder = new Order({
            customerId: req.body.customerId,
            totalAmount: req.body.totalAmount,
            orderItems: req.body.orderItems,
            status: 'Pending', // Default status
            paymentType: req.body.paymentType,
            paymentStatus: req.body.paymentStatus,
            paymentDate: req.body.paymentDate,
        });

        // Save the order into DB
        const savedOrder = await newOrder.save();

        // Reduce the quantity for each product in the order
        // for (const orderItem of orderItems) {
        //     await updateProductQuantity(orderItem._id, orderItem.quantity);
        // }

        res.status(201).json(savedOrder);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating the order', error: error });
    }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('customerId', 'name email address phone');
        res.json(orders);
    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(500).json({ message: 'Error retrieving orders', error });
    }
};

// Get a order by ID
exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await Order.findById(orderId).populate('customerId', 'name email address phone');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        console.error('Error retrieving order by ID:', error);
        res.status(500).json({ message: 'Error retrieving order by ID', error });
    }
};

// Get a order by User ID
// exports.getOrdersByUserId = async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const orders = await Order.find({ customerId: userId }).populate('items');
//         res.json(orders);
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving orders', error });
//     }
// };

// Get orders by User ID
exports.getOrdersByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const orders = await Order.find({ customerId: userId }).populate('customerId', 'name email address phone');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving orders', error });
    }
};


// Update the status of an order in the dashboard
exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = req.body.status;
        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status' });
    }
};

// Update the status of an order by ID
exports.updateOrderStatusById = async (req, res) => {
    const { orderId } = req.params;
    const { newStatus } = req.body;

    try {
        let update = { status: newStatus };
        if (newStatus === 'Delivered') {
            update.deliveredDate = new Date();
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            update,
            { new: true }
        );
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Update the Driver Assigned By ID for an orders
exports.updateDriverAssignById = async (req, res) => {
    const { orderId } = req.params;
    const { newStatus } = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { driver: newStatus },
            { new: true }
        );
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Delete an order
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        await order.remove();
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order' });
    }
};


// Get all delivered orders by Driver ID
exports.getDeliveredOrdersByDriver = async (req, res) => {
    try {
        const { driverId } = req.params;
        const deliveredOrders = await Order.find({
            driver: driverId,
            status: 'Delivered'
        }).populate('customerId', 'name email address phone');

        res.json(deliveredOrders);
    } catch (error) {
        console.error('Error retrieving delivered orders:', error);
        res.status(500).json({ message: 'Error retrieving delivered orders', error });
    }
};


// Get all pending/processing/packaging orders by Driver ID
exports.getActiveOrdersByDriver = async (req, res) => {
    try {
        const { driverId } = req.params;
        const activeOrders = await Order.find({
            driver: driverId,
            status: { $in: ['Pending', 'Processing', 'Packaging'] }
        }).populate('customerId', 'name email address phone');

        res.json(activeOrders);
    } catch (error) {
        console.error('Error retrieving active orders:', error);
        res.status(500).json({ message: 'Error retrieving active orders', error });
    }
};


// Get all delivered orders
exports.getDeliveredOrders = async (req, res) => {
    try {
        const deliveredOrders = await Order.find({ status: 'Delivered' })
            .populate('customerId', 'name address');
        res.json(deliveredOrders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching delivered orders', error });
    }
};


// Cancel an order 
exports.cancelOrder = async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      if (order.paymentType === 'cash' && order.status === 'Pending') 
      {
        order.status = 'Cancelled';

        // Save the updated order
        const updatedOrder = await order.save();
  
        return res.json(updatedOrder);
      } else {
        return res.status(400).json({ message: 'Order cannot be cancelled' });
      }
    } catch (error) 
    {
      console.error('Error cancelling order:', error);
      res.status(500).json({ message: 'Error cancelling order', error });
    }
};