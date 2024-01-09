import mongoose, { Document } from 'mongoose';
const bcrypt = require('bcryptjs');

interface IUser extends Document {
  email: string;
  password: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  fullName: string;
  isActive: boolean;
}

const userSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  fullName: { type: String, require: true },
  isActive: { type: Boolean, require: true },
});

userSchema.methods.comparePassword = async function (
  this: IUser,
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);
