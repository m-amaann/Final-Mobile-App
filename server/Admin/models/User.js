const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  image: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
