const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

const app = express();

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.1f312.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
);
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

// middleware - go to /graphql to enable graphical tool
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('server is listening on port 4000');
});
