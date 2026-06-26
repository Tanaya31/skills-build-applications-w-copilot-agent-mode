import { useEffect, useState } from 'react';

const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${apiBaseUrl}/workouts`)
      .then(async (response) => {
        if (!response.ok) throw new Error(await response.text());
        return response.json();
      })
      .then((data) => setWorkouts(Array.isArray(data) ? data : data.items || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      <p>Fetches workout plans from <code>{apiBaseUrl}/workouts</code>.</p>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <ul>
          {workouts.map((workout) => (
            <li key={workout._id ?? workout.id ?? workout.name}>
              {workout.name} — {workout.durationMinutes} min ({workout.difficulty})
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
