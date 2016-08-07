import React, { PropTypes } from 'react';
import './SearchForm.css';

const SearchForm = props => {
  return (
    <form 
      className="search-form"
      onSubmit={props.onSubmit}
    >
      <label htmlFor="search">Search</label>
      <input 
        id="search"
        onChange={e => props.onChange(e.target.value)}
        type="text"
        value={props.value}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

SearchForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SearchForm;
