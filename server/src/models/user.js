const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    institution: {
      type: String
    },
    age: {
      type: String
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("user", userSchema);
