const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  deliveredDate: {
    type: Date,
    default: null, // Initially, the delivered date is null until the order is delivered
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Driver',
    default: null,
  },
  paymentType: {
    type: String,
    // required: true,
  },
  paymentStatus: {
    type: String,
    // required: true,
  },
  paymentDate: {
    type: String,
    // required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Packaging', 'Delivered'],
    default: 'Pending',
  },
  orderItems: [
    {
      productName: {
        type: String,
        required: true,
      },
      productImage: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
