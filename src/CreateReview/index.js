import Quote from './Quote';
import React, { Component, PropTypes } from 'react';
import { uuid } from '../utils';

const Field = ({
  id,
  label,
  onChange,
  type = 'text',
  value,
}) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input 
      id={id}
      onChange={e => onChange(e.target.value)}
      type={type}
      value={value}
    />
  </div>
);

class CreateReview extends Component {
  static propTypes = {
    author: PropTypes.string.isRequired,
    image: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    publishedDate: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      author: props.author,
      publishedDate: props.publishedDate,
      quotes: [],
      rating: '',
      readDate: '',
      title: props.title,
    };
    this.changeQuote = this.changeQuote.bind(this);
    this.deleteQuote = this.deleteQuote.bind(this);
    this.newQuote = this.newQuote.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(id, value) {
    this.setState({
      [id]: value,
    });
  }

  newQuote() {
    this.setState({ 
      quotes: [
        ...this.state.quotes,
        { id: uuid(), text: '' }
      ]
    });
  }

  changeQuote(id, value) {
    this.setState({
      quotes: this.state.quotes.map(quote => {
        if (quote.id === id) {
          return {
            id,
            value,
          };
        }

        return quote;
      }),
    });
  }

  deleteQuote(id) {
    this.setState({
      quotes: this.state.quotes.filter(quote => {
        return quote.id !== id;
      }),
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <button 
          onClick={this.props.onCancel}
          type="button"
        >
          Go back
        </button>

        <img src={this.props.image} alt="" />

        <Field
          id="title"
          label="Title"
          value={this.state.title}
          onChange={this.handleChange.bind(this, 'title')}
        />
        <Field
          id="author"
          label="Author"
          value={this.state.author}
          onChange={this.handleChange.bind(this, 'author')}
        />
        <Field
          id="publishedDate"
          label="Published Date"
          value={this.state.publishedDate}
          onChange={this.handleChange.bind(this, 'publishedDate')}
        />
        <Field
          id="readDate"
          label="When I read it"
          value={this.state.readDate}
          onChange={this.handleChange.bind(this, 'readDate')}
        />
        <Field
          id="rating"
          label="What I thought"
          value={this.state.rating}
          onChange={this.handleChange.bind(this, 'rating')}
        />

        <button 
          type="button"
          onClick={this.newQuote}
        >
          Add quote
        </button>
        {this.state.quotes.map(quote => (
          <Quote 
            key={quote.id}
            onChange={this.changeQuote}
            onDelete={this.deleteQuote}
            quote={quote}
          />
        ))}

        <button type="submit">Save</button>
      </form>
    );
  }
}

export default CreateReview;
