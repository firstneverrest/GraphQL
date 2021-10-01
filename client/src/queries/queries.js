import { gql } from 'apollo-boost';

const getBooksQuery = gql`
  {
    books {
      id
      name
      genre
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      id
      name
    }
  }
`;

const addBookMutation = gql`
  mutation {
    addBook(name: "", genre: "", authorId: "") {
      name
      id
    }
  }
`;

export { getAuthorsQuery, getBooksQuery, addBookMutation };
