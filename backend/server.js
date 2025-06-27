const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require('./routes/user');
const friendRoutes = require('./routes/friend');
const interactionRoutes = require('./routes/interaction');
const recommendRoutes = require('./routes/recommend');
const graphRoutes = require('./routes/graph');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/interactions', interactionRoutes);
app.use('/api/recommend', recommendRoutes);
app.use('/api/graph', graphRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server running');
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
