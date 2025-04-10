import mongoose from 'mongoose';

const MatchSchema = new mongoose.Schema({
  userId: String,
  opponentId: Number,
  worstMove: Number,
});

export default mongoose.model('Match', MatchSchema);
