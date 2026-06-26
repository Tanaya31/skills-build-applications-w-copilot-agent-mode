import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';

/**
 * Seed the octofit_db database with test data.
 */
async function seed() {
  const connectionString = 'mongodb://127.0.0.1:27017/octofit_db';

  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(connectionString);
  console.log('Connected to MongoDB:', connectionString);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const teams = await Team.create([
    { name: 'Ocean Pulse', description: 'Community team focused on cardio and endurance', memberCount: 12 },
    { name: 'Deep Current', description: 'Strength-first group with mixed workouts', memberCount: 9 },
  ]);

  const users = await User.create([
    { name: 'Avery Octo', email: 'avery@octofit.local', teamId: teams[0].id },
    { name: 'Morgan Reef', email: 'morgan@octofit.local', teamId: teams[1].id },
    { name: 'Jordan Tide', email: 'jordan@octofit.local', teamId: teams[0].id },
  ]);

  const activities = await Activity.create([
    { userId: users[0].id, type: 'Trail Run', durationMinutes: 36, caloriesBurned: 410, date: new Date('2026-06-01T07:00:00Z') },
    { userId: users[1].id, type: 'Indoor Cycling', durationMinutes: 45, caloriesBurned: 520, date: new Date('2026-06-02T09:30:00Z') },
    { userId: users[2].id, type: 'Strength Circuit', durationMinutes: 50, caloriesBurned: 450, date: new Date('2026-06-03T18:15:00Z') },
  ]);

  const leaderboard = await Leaderboard.create([
    { rank: 1, userId: users[0].id, userName: users[0].name, score: 1440 },
    { rank: 2, userId: users[1].id, userName: users[1].name, score: 1310 },
    { rank: 3, userId: users[2].id, userName: users[2].name, score: 1250 },
  ]);

  const workouts = await Workout.create([
    { name: 'Sunrise Flex', durationMinutes: 20, difficulty: 'beginner', focus: 'mobility' },
    { name: 'Core Blast', durationMinutes: 30, difficulty: 'intermediate', focus: 'strength' },
    { name: 'Cardio Surge', durationMinutes: 40, difficulty: 'advanced', focus: 'endurance' },
  ]);

  console.log('Inserted sample data:');
  console.log(`  Teams: ${teams.length}`);
  console.log(`  Users: ${users.length}`);
  console.log(`  Activities: ${activities.length}`);
  console.log(`  Leaderboard entries: ${leaderboard.length}`);
  console.log(`  Workouts: ${workouts.length}`);

  await mongoose.disconnect();
  console.log('Seeding complete.');
}

seed().catch((error) => {
  console.error('Seed script failed:', error);
  process.exit(1);
});
