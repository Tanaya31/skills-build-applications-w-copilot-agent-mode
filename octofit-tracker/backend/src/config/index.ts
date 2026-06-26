export const port = 8000;

export const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-${port}.app.github.dev`
  : `http://localhost:${port}`;

export const mongoUri = 'mongodb://127.0.0.1:27017/octofit_db';
