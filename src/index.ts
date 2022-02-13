import mongoose from 'mongoose';
import app from './app'
import config from './config/config'
import logger from './config/logger'


let server = {close:(a :any)=>{}};
mongoose.connect(config.mongoose.url).then(() => {
  logger.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: any) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close({});
  }
});




const port = 5000
app.get('/', (_, res) => {
  res.status(200).send()
})
app.listen(port, () => console.log(`Running on port ${port}`))