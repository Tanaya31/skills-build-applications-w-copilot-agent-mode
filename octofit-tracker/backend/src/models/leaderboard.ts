import { Schema, model } from 'mongoose';

export interface LeaderboardDocument {
  rank: number;
  userId: string;
  userName: string;
  score: number;
  lastUpdated: Date;
}

const leaderboardSchema = new Schema<LeaderboardDocument>({
  rank: { type: Number, required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  score: { type: Number, required: true },
  lastUpdated: { type: Date, default: () => new Date() },
});

export const Leaderboard = model<LeaderboardDocument>('Leaderboard', leaderboardSchema);
