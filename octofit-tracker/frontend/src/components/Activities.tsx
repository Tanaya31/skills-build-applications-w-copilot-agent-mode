import { useEffect, useState } from 'react';

const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export default function Activities() {
  const [activities, setActivities] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${apiBaseUrl}/activities`)
      .then(async (response) => {
        if (!response.ok) throw new Error(await response.text());
        return response.json();
      })
      .then((data) => setActivities(Array.isArray(data) ? data : data.items || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      <p>Fetches activity records from <code>{apiBaseUrl}/activities</code>.</p>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <ul>
          {activities.map((activity) => (
            <li key={activity._id ?? activity.id ?? JSON.stringify(activity)}>
              {activity.type} | {activity.durationMinutes} min | {activity.caloriesBurned} kcal
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
