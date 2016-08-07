import React, { PropTypes } from 'react';

const Results = props => {
  if (!props.items.length) {
    return null;
  }

  const items = props.items.map(item => {
    const { 
      title,
      authors = [],
      publishedDate,
      description,
      imageLinks,
    } = item.volumeInfo;

    return (
      <div key={item.id}>
        {imageLinks && <img src={imageLinks.thumbnail} alt="" />}
        <h2>{title}</h2>
        <h3>{authors.join(', ')}</h3>
        <button 
          onClick={props.onSelect.bind(null, item.id)}
          type="button"
        >
          Add
        </button>
        Published: {publishedDate}
        <p>{description}</p>
      </div>
    );
  });

  return (
    <div className="search-items">
      {items}
    </div>
  );
};

Results.propTypes = {
  items: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Results;
