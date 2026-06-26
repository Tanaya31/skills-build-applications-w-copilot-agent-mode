import { Schema, model } from 'mongoose';

export interface UserDocument {
  name: string;
  email: string;
  teamId?: string;
  createdAt: Date;
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  teamId: { type: String },
  createdAt: { type: Date, default: () => new Date() },
});

export const User = model<UserDocument>('User', userSchema);
