const { users } = require('./data');

const resolvers = {
  Query: {
    getAllUsers() {
      return users;
    },
  },
};

module.exports = { resolvers };
