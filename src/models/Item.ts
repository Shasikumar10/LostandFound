import mongoose from 'mongoose';
import { ItemStatus } from '@/types';

const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }
});

const ContactSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: String }
});

const ItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: Object.values(ItemStatus),
    required: true
  },
  category: {
    type: String,
    required: true
  },
  location: {
    type: LocationSchema,
    required: true
  },
  contact: {
    type: ContactSchema,
    required: true
  },
  imageUrl: {
    type: String
  }
}, {
  timestamps: true
});

// Create the model safely for browser environment
let ItemModel;
try {
  // Check if model already exists to prevent overwriting
  ItemModel = mongoose.model('Item');
} catch (error) {
  // Model doesn't exist yet, create it
  ItemModel = mongoose.model('Item', ItemSchema);
}

export default ItemModel;