import { useEffect, useState } from 'react';

const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${apiBaseUrl}/users`)
      .then(async (response) => {
        if (!response.ok) throw new Error(await response.text());
        return response.json();
      })
      .then((data) => setUsers(Array.isArray(data) ? data : data.items || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Users</h2>
      <p>Fetches users from <code>{apiBaseUrl}/users</code>.</p>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id ?? user.id ?? user.email}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
