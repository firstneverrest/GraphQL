import React, { useState, useEffect } from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import { getAuthorsQuery, addBookMutation } from '../queries/queries';
import classes from './AddBook.module.css';

const AddBook = (props) => {
  const [authors, setAuthors] = useState([]);
  const [bookName, setBookName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');
  const isLoading = props.getAuthorsQuery.loading;

  useEffect(() => {
    displayAuthors();
  }, [isLoading]);

  useEffect(() => {
    if (authors !== undefined) {
      for (const id in authors[0]) {
        setAuthorId(authors[0].id);
        break;
      }
    }
  }, [authors]);

  const displayAuthors = () => {
    setAuthors(props.getAuthorsQuery.authors);
  };

  const bookHandler = (event) => {
    setBookName(event.target.value);
  };
  const genreHandler = (event) => {
    setGenre(event.target.value);
  };
  const authorIdHandler = (event) => {
    setAuthorId(event.target.value);
  };

  if (authors === undefined) {
    return <div>Loading...</div>;
  }

  const submitAddBook = (event) => {
    event.preventDefault();
    props.addBookMutation({
      variables: {
        name: bookName,
        genre: genre,
        authorId: authorId,
      },
    });
  };
  console.log(props);

  return (
    <section className={classes.books_container}>
      <h3>Add a Book</h3>
      <form onSubmit={(event) => submitAddBook(event)}>
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
          <select onChange={authorIdHandler} value={authorId}>
            {authors.map((author) => {
              return (
                <option key={author.id} value={author.id}>
                  {author.name}
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

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
