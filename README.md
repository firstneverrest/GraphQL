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

### GraphQL graphical tool

![image](images/graphql-gui.jpg)

## Make ID argument more flexible

The above example will use id as a string type. If client provides integer, GraphQL will send cannot find id message because of unmatched type. However, you can make it be more flexible with `GraphQLID`. Therefore, just only change from `GraphQLString` to `GraphQLID` type.

## Add more than one schema

```js
// define author type
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    star: { type: GraphQLFloat },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from database or other source
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});
```

## Type Relations

Add relation between two schemas with `resolve(parent, args)` which enable you to give nested data to client.

```js
// schema data
const books = [
  { id: '1', name: 'Wind Song', genre: 'Fantasy', authorId: '1' },
  { id: '2', name: 'Strong Warrior', genre: 'Adventure', authorId: '2' },
  { id: '3', name: 'The Great Black Hole', genre: 'Sci-Fi', authorId: '3' },
];

const authors = [
  { id: '1', name: 'James Kotlin', star: 4 },
  { id: '2', name: 'Rose Pumpkin', star: 4.5 },
  { id: '3', name: 'Sweet Hunk', star: 5 },
];

// define book type
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});
```

```js
// query example
{
  book(id: 1) {
    name
    genre
    author{
      name
      star
    }
  }
}
```

## GraphQL Lists

In case your child data have more than one. For example, one author has more than one book. How we can output all of the author's books? The solution is graphql Lists.

```js
// schema data
const books = [
  { id: '1', name: 'Wind Song', genre: 'Fantasy', authorId: '1' },
  { id: '2', name: 'Strong Warrior', genre: 'Adventure', authorId: '2' },
  { id: '3', name: 'The Great Black Hole', genre: 'Sci-Fi', authorId: '3' },
  { id: '3', name: 'Minor Major', genre: 'Sci-Fi', authorId: '1' },
  { id: '3', name: 'Time Slot', genre: 'Sci-Fi', authorId: '2' },
  { id: '3', name: 'Divine Sword', genre: 'Adventure', authorId: '3' },
];

// define author type
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    star: { type: GraphQLFloat },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});
```

```js
// query example
{
  author(id: 1) {
    name
    star
    books{
      name
      genre
    }
  }
}
```

## Root Queries

Maybe you would like to send all data like all books or all authors. You can do that in root queries.

```js
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from database or other source
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
    // add books
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },
    // add authors
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      },
    },
  },
});
```

## Connect to Database

In this tutorial, I will use MongoDB Atlas as a MongoDB Hosting.

```js
// app.js
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
```
