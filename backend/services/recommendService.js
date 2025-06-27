const Friendship = require('../models/Friendship');
const Interaction = require('../models/Interaction');
const User = require('../models/User');

async function getRecommendations(userId, k = 5) {
  const friendships = await Friendship.find();
  const interactions = await Interaction.find();

  const graph = new Map();
  friendships.forEach(({ user1, user2 }) => {
    if (!graph.has(user1.toString())) graph.set(user1.toString(), []);
    if (!graph.has(user2.toString())) graph.set(user2.toString(), []);
    graph.get(user1.toString()).push(user2.toString());
    graph.get(user2.toString()).push(user1.toString());
  });

  const visited = new Set(graph.get(userId.toString()) || []);
  const mutualMap = new Map();
  const queue = [...visited];

  for (const friend of queue) {
    const friendsOfFriend = graph.get(friend) || [];
    for (const candidate of friendsOfFriend) {
      if (candidate === userId.toString() || visited.has(candidate)) continue;
      mutualMap.set(candidate, (mutualMap.get(candidate) || 0) + 1);
    }
  }

  const scoreMap = new Map();
  interactions.forEach(({ from, to }) => {
    const key = from.toString() === userId.toString() ? to.toString() : from.toString();
    if (!visited.has(key)) scoreMap.set(key, (scoreMap.get(key) || 0) + 1);
  });

  const scored = Array.from(mutualMap.entries()).map(([id, mutual]) => {
    const score = mutual * 2 + (scoreMap.get(id) || 0);
    return { id, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const topK = scored.slice(0, k);
  const users = await User.find({ _id: { $in: topK.map(i => i.id) } });

  return users;
}

module.exports = { getRecommendations };
