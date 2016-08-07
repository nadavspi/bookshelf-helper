import React, { PropTypes } from 'react';

const Quote = ({ quote, onChange, onDelete }) => (
  <div>
    <div>
      <textarea
        key={quote.id}
        onChange={e => onChange(quote.id, e.target.value)}
        value={quote.text}
      />
    </div>
    <button 
      onClick={onDelete.bind(null, quote.id)}
      type="button"
    >
      Delete
    </button>
  </div>
);

Quote.propTypes = {
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  quote: PropTypes.object.isRequired,
};

export default Quote;
