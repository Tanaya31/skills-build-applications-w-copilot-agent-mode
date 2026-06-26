import { Router } from 'express';
import { User } from '../models/user';

const router = Router();

router.get('/', async (_, res) => {
  const users = await User.find();
  res.json(users);
});

router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

router.post('/', async (req, res) => {
  const payload = req.body as Partial<User>;
  const newUser = new User({
    name: payload.name ?? 'New OctoFit User',
    email: payload.email ?? 'user@octofit.local',
    teamId: payload.teamId,
  });
  await newUser.save();
  res.status(201).json(newUser);
});

export default router;
