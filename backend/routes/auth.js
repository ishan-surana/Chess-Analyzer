import express from 'express';
import User from '../models/User.js';
const router = express.Router();

router.post('/login', async (req, res) => {
  const { userId, password } = req.body;
  const user = await User.findOne({ userId, password });
  if (user) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials!' });
  }
});

router.post('/signup', async (req, res) => {
  const { userId, password } = req.body;
  const existingUser = await User.findOne({ userId });
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'User already exists!' });
  }
  const newUser = new User({ userId, password });
  await newUser.save();
  res.json({ success: true, message: 'Signup successful!' });
});


export default router;
