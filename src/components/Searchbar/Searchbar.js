import React, { useState } from 'react';
import '../../index.css';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => setQuery(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <form className="SearchForm" onSubmit={handleSubmit}>
      <button className="SearchForm-button" type="submit">
        Search
      </button>

      <input
        className="SearchForm-input"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        value={query}
        onChange={handleChange}
      />
    </form>
  );
};
