const { v4: uuidv4 } = require("uuid");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  username: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  hobbies: {
    type: [String],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
