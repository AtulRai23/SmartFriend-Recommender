import { useEffect, useState } from 'react';
import API from '../api';

export default function UserList({ onSelect }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get('/users').then(res => setUsers(res.data));
  }, []);

  return (
    <div>
      <h3>All Users</h3>
      <ul>
        {users.map(u => (
          <li key={u._id}>
            <button onClick={() => onSelect(u._id)}>{u.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
