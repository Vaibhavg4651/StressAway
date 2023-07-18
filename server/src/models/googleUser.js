import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mood: {
    type: Array
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const guser = mongoose.model('guser', UserSchema)

export default guser