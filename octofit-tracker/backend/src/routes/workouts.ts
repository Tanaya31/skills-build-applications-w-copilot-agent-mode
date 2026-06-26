import { Router } from 'express';
import { Workout, WorkoutDocument } from '../models/workout';

const router = Router();

router.get('/', async (_, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

router.post('/', async (req, res) => {
  const payload = req.body as Partial<WorkoutDocument>;
  const newWorkout = new Workout({
    name: payload.name ?? 'New Workout',
    durationMinutes: payload.durationMinutes ?? 0,
    difficulty: payload.difficulty ?? 'beginner',
    focus: payload.focus ?? 'general fitness',
  });
  await newWorkout.save();
  res.status(201).json(newWorkout);
});

export default router;
