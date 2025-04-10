import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userId: String,
  password: String,
});

export default mongoose.model('User', UserSchema);
