import { useState } from 'react';
import UserList from './components/UserList';
import RecommendationList from './components/RecommendationList';
import GraphView from './components/GraphView';

function App() {
  const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    <div>
      <h1>Friend Recommendation System</h1>
      <UserList onSelect={setSelectedUserId} />
      <hr />
      <RecommendationList userId={selectedUserId} />
      <GraphView userId={selectedUserId} />
    </div>
  );
}

export default App;
