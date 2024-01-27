const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String 
  },
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;