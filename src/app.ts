import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';
import config from './config/config';
import morgan from './config/morgan';
import httpStatus from 'http-status';
import { jwtStrategy }from './config/passport';
import mongoSanitize from 'express-mongo-sanitize';
import { authLimiter } from './middlewares/rateLimiter';
import routes from './routes/v1';
import { errorConverter, errorHandler } from './middlewares/error';
import ApiError from './utils/ApiError';
const xss = require('xss-clean');
const app = express();

if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
  }

export default app;