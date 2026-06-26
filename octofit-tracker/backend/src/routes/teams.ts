import { Router } from 'express';
import { Team } from '../models/team';

const router = Router();

router.get('/', async (_, res) => {
  const teams = await Team.find();
  res.json(teams);
});

router.get('/:teamId', async (req, res) => {
  const team = await Team.findById(req.params.teamId);
  if (!team) {
    return res.status(404).json({ error: 'Team not found' });
  }
  res.json(team);
});

router.post('/', async (req, res) => {
  const payload = req.body as Partial<Team>;
  const newTeam = new Team({
    name: payload.name ?? `Team ${Date.now()}`,
    description: payload.description ?? 'Team description pending.',
    memberCount: payload.memberCount ?? 0,
  });
  await newTeam.save();
  res.status(201).json(newTeam);
});

export default router;
