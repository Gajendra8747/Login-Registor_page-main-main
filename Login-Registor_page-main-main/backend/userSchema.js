import { Schema, model } from 'mongoose';

// User Schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = model('User', userSchema);
export default User;