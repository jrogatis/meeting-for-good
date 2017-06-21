import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  googleId: { type: String, required: false, index: true },
  emails: Array,
  name: { type: String, required: true },
  avatar: { type: String, required: false },
});

export default mongoose.model('User', UserSchema);
