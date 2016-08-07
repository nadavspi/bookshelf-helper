import './App.css';
import Client from './Client';
import CreateReview from './CreateReview';
import React, { Component } from 'react';
import Results from './Results';
import SearchForm from './SearchForm';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {},
      items: [],
      query: '',
    }
    this.createReview = this.createReview.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  createReview(data) {
    console.log(data);
  }

  handleSearch(e) {
    e.preventDefault();
    Client.search(this.state.query).then(results => {
      this.setState({ items: results.items });
    });
  }

  handleSelect(id) {
    const item = this.state.items.find(item => item.id === id);
    this.setState({ 
      item,
    });

    // Client.lookup(id).then(item => {
    //   this.setState({ item });
    // });
  }

  render() {
    const { item } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <SearchForm 
            onChange={query => this.setState({ query })}
            onSubmit={this.handleSearch}
            value={this.state.query}
          />
        </div>
        {Object.keys(item).length ? (
          <CreateReview 
            author={item.volumeInfo.authors.join(', ')}
            image={item.volumeInfo.imageLinks.small}
            onCancel={() => this.setState({ item: {} })}
            onSubmit={this.createReview}
            publishedDate={item.volumeInfo.publishedDate}
            title={item.volumeInfo.title}
          />
        ) : (
          <Results 
            items={this.state.items} 
            onSelect={this.handleSelect}
          />
        )}
      </div>
    );
  }
}

export default App;
