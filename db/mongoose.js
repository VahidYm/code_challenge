const mongoose = require('mongoose');
const log = require('../helpers/logger');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
async function connectMongoDB() {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
    mongoose.connect(mongoUri);
    mongoose.connection.on('error', e => {
        log.error(e);
    });
    mongoose.connection.once('open', () => {
        log.info(`MongoDB successfully connected to ${mongoUri}`);
    });
}

async function disconnectMongoDB() {
  mongoose.disconnect();
  mongoServer.stop();
}

module.exports = {
    connectMongoDB,
    disconnectMongoDB,
};