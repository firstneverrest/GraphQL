const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

// middleware - go to /graphql to open GraphQL GUI
app.use('/graphql', graphqlHTTP({}));

app.listen(4000, () => {
  console.log('server is listening on port 4000');
});
