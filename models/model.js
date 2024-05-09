const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  level: {
    type: Number,
    required: true,
    default: 0
  },
  earnings: {
    type: Number,
    default: 0
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
