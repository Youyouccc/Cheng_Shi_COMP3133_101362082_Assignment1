const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer } = require("apollo-server-express");

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
const app = express();



// Connect to MongoDB
mongoose.connect('mongodb+srv://heatherchengshi:R5FcEou5ZNUNTSZD@cluster0.f4tb3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected successful'))
  .catch(err => console.log(err));

const server = new ApolloServer({
  typeDefs, 
  resolvers,
  introspection: true,
  playground: true,
});

app.use(express.json());
app.use('*', cors());



async function startServer() {
  // Make sure to await server.start()
  await server.start();

  // Now you can apply the middleware
  server.applyMiddleware({ app });

  // Start the server
  app.listen(4000, () => {
    console.log('Server running on http://localhost:4000/graphql');
  });

}

// Call the startServer function to start everything
startServer();
