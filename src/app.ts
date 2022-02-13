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
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const app = express();
const xss = require('xss-clean');

if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
  }

export default app;