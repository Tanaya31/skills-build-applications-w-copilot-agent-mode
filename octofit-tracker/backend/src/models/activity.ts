import { Schema, model } from 'mongoose';

export interface ActivityDocument {
  userId: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
}

const activitySchema = new Schema<ActivityDocument>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, default: () => new Date() },
});

export const Activity = model<ActivityDocument>('Activity', activitySchema);
