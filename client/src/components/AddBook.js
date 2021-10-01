import React, { useState, useEffect } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery } from '../queries/queries';
import classes from './AddBook.module.css';

const AddBook = (props) => {
  const [authors, setAuthors] = useState([]);
  const isLoading = props.data.loading;

  useEffect(() => {
    displayAuthors();
  }, [isLoading]);

  const displayAuthors = () => {
    setAuthors(props.data.authors);
  };

  if (authors === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <section className={classes.books_container}>
      <h3>Add a Book</h3>
      <form>
        <div>
          <label for="book">Book Name:</label>
          <input type="text" name="book" />
        </div>
        <div className="field">
          <label for="genre">Genre:</label>
          <input type="text" name="genre" />
        </div>
        <div className="field">
          <label for="book">Author:</label>
          <select>
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
