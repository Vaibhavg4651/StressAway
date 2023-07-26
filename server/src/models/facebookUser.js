import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  facebookId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  mood: {
    type: Array,
  },
  test:{
    type: Array
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const fuser = mongoose.model("fuser", UserSchema);

export default fuser;
