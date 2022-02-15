const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  # Queries
  type Query {
    getAllUsers: [User!]!
  }

  # Mutations
`;

module.exports = { typeDefs };
