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
    
    handleSubmit(event){
    	event.preventDefault();

    	const bookName = ReactDOM.findDOMNode(this.refs.bookName).value.trim();

    	Books.insert({ title: bookName, createdAt: new Date() });

    	ReactDOM.findDOMNode(this.refs.bookName).value = '';
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
	          <h1>Book Exchange</h1>
	          <form className="new-book" onSubmit={this.handleSubmit.bind(this)} >
	          	<input type="text" ref="bookName" placeholder="Harry Potter" />
	          </form>
	        </header>

	        <ul>
	        	{this.renderBooks()}
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