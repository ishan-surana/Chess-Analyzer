import express from 'express';
import Match from '../models/Match.js';

const router = express.Router();

router.post('/matches', async (req, res) => {
  const match = new Match(req.body);
  await match.save();
  res.json({ success: true, match });
});

router.get('/matches/:uid', async (req, res) => {
  const matches = await Match.find({ userId: req.params.uid });
  res.json(matches);
});

export default router;
