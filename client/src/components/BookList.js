import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import classes from './BookList.module.css';

const getBooksQuery = gql`
  {
    books {
      id
      name
      genre
    }
  }
`;

const BookList = (props) => {
  const [books, setBooks] = useState([]);
  const isLoading = props.data.loading;

  useEffect(() => {
    displayBooks();
  }, [isLoading]);

  const displayBooks = () => {
    setBooks(props.data.books);
  };

  if (books === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <section className={classes.books_container}>
      <ul id="book-list">
        {books.map((book) => {
          return <li key={book.id}>{`${book.name} (${book.genre}`})</li>;
        })}
      </ul>
    </section>
  );
};

export default graphql(getBooksQuery)(BookList);
