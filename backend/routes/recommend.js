const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../services/recommendService');

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const users = await getRecommendations(userId);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
