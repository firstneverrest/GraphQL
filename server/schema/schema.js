const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLFloat,
} = graphql;

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

module.exports = new GraphQLSchema({
  query: RootQuery,
});
