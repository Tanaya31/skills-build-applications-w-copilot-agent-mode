import './App.css';
import { NavLink, Routes, Route } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

if (!codespaceName) {
  console.warn('VITE_CODESPACE_NAME is not defined. Falling back to localhost API URL.');
}

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>OctoFit Tracker</h1>
        <p className="app-subtitle">
          A multi-tier fitness dashboard powered by React 19 and Vite.
        </p>
        <nav className="app-nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
        </nav>
        <div className="api-banner">
          <span>API base URL:</span>
          <code>{apiBaseUrl}</code>
        </div>
        <div className="env-note">
          <strong>Note:</strong> Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces URLs.
        </div>
      </header>

      <main className="app-content">
        <Routes>
          <Route
            path="/"
            element={
              <section>
                <h2>Welcome</h2>
                <p>
                  Use the navigation above to explore the OctoFit API resources. If a Codespace name is not set, the app will fall back to <code>http://localhost:8000/api</code>.
                </p>
              </section>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
