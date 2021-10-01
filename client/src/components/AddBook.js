import React, { useState, useEffect } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery, addBookMutation } from '../queries/queries';
import classes from './AddBook.module.css';

const AddBook = (props) => {
  const [authors, setAuthors] = useState([]);
  const [book, setBook] = useState('');
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');
  const isLoading = props.data.loading;

  useEffect(() => {
    displayAuthors();
  }, [isLoading]);

  const displayAuthors = () => {
    setAuthors(props.data.authors);
  };

  const bookHandler = (event) => {
    setBook(event.target.value);
  };
  const genreHandler = (event) => {
    setGenre(event.target.value);
  };
  const authorHandler = (event) => {
    setAuthor(event.target.value);
  };

  if (authors === undefined) {
    return <div>Loading...</div>;
  }

  const submitAddBook = (event) => {
    event.preventDefault();
    console.log(book, genre, author);
  };

  return (
    <section className={classes.books_container}>
      <h3>Add a Book</h3>
      <form onSubmit={submitAddBook}>
        <div>
          <label htmlFor="book">Book Name:</label>
          <input type="text" name="book" onChange={bookHandler} />
        </div>
        <div className="field">
          <label htmlFor="genre">Genre:</label>
          <input type="text" name="genre" onChange={genreHandler} />
        </div>
        <div className="field">
          <label htmlFor="book">Author:</label>
          <select onChange={authorHandler}>
            {authors.map((authors) => {
              return (
                <option key={authors.id} value={authors.id}>
                  {authors.name}
                </option>
              );
            })}
          </select>
        </div>
        <button>Add</button>
      </form>
    </section>
  );
};

export default graphql(getAuthorsQuery)(AddBook);
