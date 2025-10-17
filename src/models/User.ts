import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  phone: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  profileImageUrl: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Create the model safely for browser environment
let UserModel;
try {
  // Check if model already exists to prevent overwriting
  UserModel = mongoose.model('User');
} catch (error) {
  // Model doesn't exist yet, create it
  UserModel = mongoose.model('User', UserSchema);
}

export default UserModel;