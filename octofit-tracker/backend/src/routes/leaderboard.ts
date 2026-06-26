import { Router } from 'express';
import { Leaderboard } from '../models/leaderboard';

const router = Router();

router.get('/', async (_, res) => {
  const leaderboard = await Leaderboard.find().sort({ rank: 1 });
  res.json(leaderboard);
});

export default router;
