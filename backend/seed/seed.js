const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Friendship = require('../models/Friendship');
const Interaction = require('../models/Interaction');

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  await User.deleteMany();
  await Friendship.deleteMany();
  await Interaction.deleteMany();

  const users = await User.insertMany([
    { name: 'Alice', email: 'alice@email.com' },
    { name: 'Bob', email: 'bob@email.com' },
    { name: 'Charlie', email: 'charlie@email.com' },
    { name: 'David', email: 'david@email.com' },
    { name: 'Eve', email: 'eve@email.com' },
  ]);

  const findId = name => users.find(u => u.name === name)._id;

  await Friendship.insertMany([
    { user1: findId('Alice'), user2: findId('Bob') },
    { user1: findId('Bob'), user2: findId('Charlie') },
    { user1: findId('Alice'), user2: findId('David') },
    { user1: findId('Eve'), user2: findId('Bob') },
  ]);

  await Interaction.insertMany([
    { from: findId('Alice'), to: findId('Charlie'), type: 'message' },
    { from: findId('Alice'), to: findId('Eve'), type: 'like' },
    { from: findId('Eve'), to: findId('Alice'), type: 'comment' },
    { from: findId('Charlie'), to: findId('David'), type: 'message' },
  ]);

  console.log('✅ Seed data inserted');
  process.exit();
}

seed();
