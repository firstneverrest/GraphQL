# GraphQL

GraphQL is a query language for APIs which is an alternative for REST APIs. The main advantage of GraphQL is clients can ask for exactly what they need. Therefore, the data that client don't need will not include in the response. [Visit GraphQL to get more information](https://graphql.org/).

To illustrate how GraphQL works, I created web server with express and front-end application with React.

## Install GraphQL

You need to install graphql and express-graphql packages to use graphql in express.

```
npm install graphql express-graphql
```

## Define Schema

You need to define schema to let GraphQL know what kind of data you have.

```js
// schema.js
const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// define book type
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from database or other source
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
```

## Set up GraphQL middleware

After defining the schema, you can use that schema to include in graphql. Moreover, GraphQL provides graphical tool for test sending the request.

```js
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

// middleware - go to localhost:4000/graphql to enable graphical tool
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
```
