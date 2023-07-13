require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const { schema, root } = require('./schema/petSchema');
const connectDB = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB(); // Connect to MongoDB

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
