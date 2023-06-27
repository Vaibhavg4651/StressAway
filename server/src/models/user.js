import mongoose from 'mongoose'


const userSchema = new mongoose.Schema(
  {
    name: {
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
const User = mongoose.model('user', userSchema)

export default User