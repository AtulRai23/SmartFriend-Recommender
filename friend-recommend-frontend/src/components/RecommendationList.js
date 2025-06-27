import { useEffect, useState } from 'react';
import API from '../api';

export default function RecommendationList({ userId }) {
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    if (!userId) return;
    API.get(`/recommend/${userId}`).then(res => setRecs(res.data));
  }, [userId]);

  return (
    <div>
      <h3>Recommended Friends</h3>
      <ul>
        {recs.map(u => <li key={u._id}>{u.name}</li>)}
      </ul>
    </div>
  );
}
