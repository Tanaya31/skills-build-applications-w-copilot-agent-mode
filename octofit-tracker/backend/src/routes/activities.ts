import { Router } from 'express';
import { Activity, ActivityDocument } from '../models/activity';

const router = Router();

router.get('/', async (_, res) => {
  const activities = await Activity.find();
  res.json(activities);
});

router.post('/', async (req, res) => {
  const payload = req.body as Partial<ActivityDocument>;
  const newActivity = new Activity({
    userId: payload.userId ?? '1',
    type: payload.type ?? 'Workout',
    durationMinutes: payload.durationMinutes ?? 0,
    caloriesBurned: payload.caloriesBurned ?? payload.calories ?? 0,
    date: payload.date ? new Date(payload.date) : new Date(),
  });
  await newActivity.save();
  res.status(201).json(newActivity);
});

export default router;
