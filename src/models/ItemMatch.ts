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

export default mongoose.models.ItemMatch || mongoose.model('ItemMatch', ItemMatchSchema);