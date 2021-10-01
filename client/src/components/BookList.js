import React, { useState, useEffect } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import classes from './BookList.module.css';

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
      <h3>Book List</h3>
      <ul id="book-list">
        {books.map((book) => {
          return <li key={book.id}>{`${book.name} (${book.genre}`})</li>;
        })}
      </ul>
    </section>
  );
};

export default graphql(getBooksQuery)(BookList);
