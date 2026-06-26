import { Schema, model } from 'mongoose';

export interface TeamDocument {
  name: string;
  description: string;
  memberCount: number;
  createdAt: Date;
}

const teamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  memberCount: { type: Number, required: true },
  createdAt: { type: Date, default: () => new Date() },
});

export const Team = model<TeamDocument>('Team', teamSchema);
