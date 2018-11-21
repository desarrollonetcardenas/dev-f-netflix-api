const {
  GraphQLServer
} = require('graphql-yoga');
const mongoose = require('mongoose');

const Mutation = require('./resolvers/Mutations');
const Query = require('./resolvers/Query');


/**
 * Mongo Db connection string
 *
 *
 */

const MONGO_URL = 'mongodb://admin:xQTSZl2Zy6OQreuf@cluster0-shard-00-00-sdkax.mongodb.net:27017,cluster0-shard-00-01-sdkax.mongodb.net:27017,cluster0-shard-00-02-sdkax.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error',
    (err) => {
      console.log('Failed to connect to mongo: ', err);
    })
  .once('open', () => {
    console.log('Connected to mongo db');
  });

const resolvers = {
  Query,
  Mutation
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req
  })
});

const options = {
  port: 8002,
  endpoint: '/graphql',
  playground: '/playground'
};

server.start(options,
  ({
    port
  }) => {
    console.log('Start in port ' + port);
  });
