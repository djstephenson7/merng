const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/typeDefs');

const mongoose = require('mongoose');
const { MONGODB } = require('./config');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    return server.listen({ port: 5000 });
  })
  .then((res) => console.log(`Server running at ${res.url}`))
  .catch((e) => console.log(`ERROR: ${e}`));
