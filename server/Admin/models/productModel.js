const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  discountprice: {
    type: Number,
  },
  stockQuantity: {
    type: Number,
    required: true,
    default: 0, 
  },
  sizes: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],
  colors: [
    {
      name: {
        type: String,
      },
    },
  ],
  newArrival: {
    type: Boolean,
    required: true,
    default: false,
  },
  popular: {
    type: Boolean,
    required: true,
    default: false,
  },
  topSale: {
    type: Boolean,
    required: true,
    default: false,
  }
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
