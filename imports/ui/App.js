import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Books } from '../api/collections.js';
import { Users } from '../api/collections.js';
import Book from './Book.js';

class App extends Component {

	constructor(props) {
    super(props);
  }

  /**
  bookTitle: title of the book
  bookIsbn: isbn number of the book
  bookClass: class that the book is used for
  bookPrice: price of the book set by the user
  **/
  handleSubmit(event){
  	event.preventDefault();

    // Retrieve values from the text fields
  	const bookTitle = ReactDOM.findDOMNode(this.refs.bookTitle).value.trim();
    const bookIsbn = ReactDOM.findDOMNode(this.refs.bookIsbn).value.trim();
    const bookClass = ReactDOM.findDOMNode(this.refs.bookClass).value.trim();
    const bookPrice = ReactDOM.findDOMNode(this.refs.bookPrice).value.trim();

    // Insert into Books Collection
  	Books.insert({ title: bookTitle, isbn: bookIsbn, className: bookClass, price: bookPrice, createdAt: new Date() });

    // Reset values from the text fields
  	ReactDOM.findDOMNode(this.refs.bookTitle).value = '';
    ReactDOM.findDOMNode(this.refs.bookIsbn).value = '';
    ReactDOM.findDOMNode(this.refs.bookClass).value = '';
    ReactDOM.findDOMNode(this.refs.bookPrice).value = '';
  }

  renderBooks() {
  	return this.props.books.map((book) => (
  		<Book key={book._id} book={book} />
  	));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Sell Your Book</h1>
          <form className="new-book" onSubmit={this.handleSubmit.bind(this)} >
          	<label>Book Title</label><input type="text" ref="bookTitle" placeholder="i.e. Introduction to Linear Algebra" /><br/>
            <label>Book ISBN</label><input type="text" ref="bookIsbn" placeholder="i.e. 1234-5678-9101" /><br/>
            <label>Book Class</label><input type="text" ref="bookClass" placeholder="i.e. EECS 183" /><br/>
            <label>Book Price</label><input type="text" ref="bookPrice" placeholder="i.e. 17.99"/><br/>
            <input type="submit" value="Submit" />
          </form>
        </header>
        <ul>
        	{ this.renderBooks() }
        </ul>
      </div>
    );
	}
}

/** 
Gives a name for the MongoDB queries
More Info on Find():
	https://docs.mongodb.com/manual/reference/method/db.collection.find/
 **/
export default withTracker(() => {
  return {
  	books: Books.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(App);