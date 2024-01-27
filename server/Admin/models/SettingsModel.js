const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
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

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
