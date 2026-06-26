import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import { apiBaseUrl, mongoUri, port } from './config';

const app = express();

app.use(express.json());
app.use('/api', routes);

app.get('/health', (_, res) => {
  res.json({ status: 'ok', apiBaseUrl, mongoUri });
});

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB at', mongoUri);
    app.listen(port, () => {
      console.log(`Backend listening on http://localhost:${port}`);
      console.log(`API base URL: ${apiBaseUrl}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  });
