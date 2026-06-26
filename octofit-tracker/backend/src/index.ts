import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 8000;
const mongoUri = 'mongodb://127.0.0.1:27017/octofit_tracker';

app.use(express.json());

app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB at', mongoUri);
    app.listen(port, () => {
      console.log(`Backend listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  });
