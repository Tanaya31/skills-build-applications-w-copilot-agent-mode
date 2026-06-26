import mongoose from 'mongoose';

export const mongoUri = 'mongodb://127.0.0.1:27017/octofit_db';

export async function connectDatabase(): Promise<typeof mongoose> {
  return mongoose.connect(mongoUri);
}

export default mongoose;
