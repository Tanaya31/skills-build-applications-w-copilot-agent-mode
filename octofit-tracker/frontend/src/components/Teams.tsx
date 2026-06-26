import { useEffect, useState } from 'react';

const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export default function Teams() {
  const [teams, setTeams] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${apiBaseUrl}/teams`)
      .then(async (response) => {
        if (!response.ok) throw new Error(await response.text());
        return response.json();
      })
      .then((data) => setTeams(Array.isArray(data) ? data : data.items || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      <p>Fetches team data from <code>{apiBaseUrl}/teams</code>.</p>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <ul>
          {teams.map((team) => (
            <li key={team._id ?? team.id ?? team.name}>
              {team.name} — {team.description || `${team.memberCount ?? 0} members`}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
