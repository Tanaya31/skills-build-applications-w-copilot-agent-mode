import { useEffect, useState } from 'react';

const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export default function Leaderboard() {
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${apiBaseUrl}/leaderboard`)
      .then(async (response) => {
        if (!response.ok) throw new Error(await response.text());
        return response.json();
      })
      .then((data) => setItems(Array.isArray(data) ? data : data.items || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      <p>Fetches ranking data from <code>{apiBaseUrl}/leaderboard</code>.</p>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <ol>
          {items.map((item) => (
            <li key={item._id ?? item.rank ?? JSON.stringify(item)}>
              {item.rank}. {item.userName ?? item.name} — {item.score ?? item.points}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
