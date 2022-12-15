import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import { authRouter, usersRouter } from './routes';
import { mongooseService } from './config';
import { swagger } from './swagger.config.js'
import { errorHandler } from './middlewares';

dotenv.config();

const app = express();

app.use(morgan('dev'));

(async () => {
  // Enabling Body
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  // Routes
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/users', usersRouter);
  // Port
  const port = +process.env.PORT || 3001;
  // Connect DB
  await mongooseService.connect();
  // Initialize Swagger
  swagger(app);
  // Use Error Middleware Universally
  app.use(errorHandler);
  // Start Server
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
})();
