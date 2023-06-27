import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema(
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
  const session = mongoose.model('user', sessionSchema)
  
  export default session