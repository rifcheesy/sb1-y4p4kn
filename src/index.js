import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';

import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';
import { logger } from './utils/logger.js';
import { initializeDB } from './services/db.js';

const app = express();
const port = process.env.PORT || 3000;

// Initialize database
initializeDB().then(() => {
  logger.info('Database initialized');
}).catch(err => {
  logger.error('Database initialization failed:', err);
  process.exit(1);
});

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },
}));
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Serve static files
app.use(express.static('src/public'));

// API routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});