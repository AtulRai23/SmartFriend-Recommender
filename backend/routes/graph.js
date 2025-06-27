const express = require('express');
const router = express.Router();
const Friendship = require('../models/Friendship');
const User = require('../models/User');

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const users = await User.find();
    const friendships = await Friendship.find();

    const nodes = users.map(u => ({ id: u._id.toString(), name: u.name }));
    const links = friendships.map(f => ({ source: f.user1.toString(), target: f.user2.toString() }));

    res.json({ nodes, links });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;