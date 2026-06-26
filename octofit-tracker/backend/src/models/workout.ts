import { Schema, model } from 'mongoose';

export interface WorkoutDocument {
  name: string;
  durationMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  focus: string;
  createdAt: Date;
}

const workoutSchema = new Schema<WorkoutDocument>({
  name: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
  focus: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() },
});

export const Workout = model<WorkoutDocument>('Workout', workoutSchema);
