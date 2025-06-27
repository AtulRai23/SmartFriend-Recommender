const express = require('express');
const router = express.Router();
const Friendship = require('../models/Friendship');

router.post('/', async (req, res) => {
  try {
    const { user1, user2 } = req.body;
    const friendship = new Friendship({ user1, user2 });
    await friendship.save();
    res.status(201).json(friendship);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
