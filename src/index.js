
const { GraphQLServer } = require('graphql-yoga');

const mongoose = require('mongoose');
const { importSchema } = require('graphql-import')
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = importSchema('./src/schema.graphql');
const Mutation = require('./resolvers/Mutations');
const Query = require('./resolvers/Query');
const verifyToken = require('./utils/verifyToken');
const { TEST_MONGO_URI, MONGO_URI } = require('./const');

/**
 * Mongo Db connection string
 *
 *
 */
const mongoUri = process.env.NODE_ENV === "test" ? TEST_MONGO_URI : MONGO_URI

mongoose.connect(mongoUri, {
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

/**Schema para las pruebas unitarias*/
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const server = new GraphQLServer({
  schema,
  context: async req => ({
    ...req,
    user: await verifyToken( req )
  })
});

const options = {
  port: process.env.PORT || 8002,
  endpoint: '/graphql',
  playground: '/playground',
  cors: {
    credentials: true,
    origin: ["http://localhost:3000"]
  }
};

server.start(options,
  ({
    port
  }) => {
    console.log('Start in port ' + port);
  });

/**Exportamos el schema que contiene los type definitions y el schema de las pruebas unitarias */
module.exports = { schema };
