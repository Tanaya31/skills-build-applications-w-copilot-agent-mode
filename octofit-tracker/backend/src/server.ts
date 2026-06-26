import express from 'express';
import routes from './routes';
import { apiBaseUrl, port, mongoUri } from './config';
import { connectDatabase } from './config/database';

const app = express();

app.use(express.json());
app.use('/api', routes);

app.get('/health', (_, res) => {
  res.json({ status: 'ok', apiBaseUrl, mongoUri });
});

connectDatabase()
  .then(() => {
    console.log('Connected to MongoDB at', mongoUri);
    app.listen(port, '0.0.0.0', () => {
      console.log(`Backend listening on http://0.0.0.0:${port}`);
      console.log(`API base URL: ${apiBaseUrl}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  });
