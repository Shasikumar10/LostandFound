import mongoose from 'mongoose';
import { MatchStatus } from '@/types';

const ItemMatchSchema = new mongoose.Schema({
  lostItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  foundItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  matchScore: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: Object.values(MatchStatus),
    default: MatchStatus.PENDING
  }
}, {
  timestamps: true
});

// Create the model safely for browser environment
let ItemMatchModel;
try {
  // Check if model already exists to prevent overwriting
  ItemMatchModel = mongoose.model('ItemMatch');
} catch (error) {
  // Model doesn't exist yet, create it
  ItemMatchModel = mongoose.model('ItemMatch', ItemMatchSchema);
}

export default ItemMatchModel;