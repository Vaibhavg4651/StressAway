import mongoose from 'mongoose'


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 50,
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
      type: Number,
    },
    mood: {
      type: Array
    }, 
    test:{
      type: Array
    }
  },
  { timestamps: true }
);
const User = mongoose.model('user', userSchema)

export default User