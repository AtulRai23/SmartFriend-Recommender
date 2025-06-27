const express = require('express');
const router = express.Router();
const Interaction = require('../models/Interaction');

router.post('/', async (req, res) => {
  try {
    const interaction = new Interaction(req.body);
    await interaction.save();
    res.status(201).json(interaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
