import React, { Component } from 'react';
import { Books } from '../api/collections.js';

export default class Book extends Component {
	render() {	
		return (
	      <li>
	        <span className="bookName">{ this.props.book.bookName }</span>
	      </li>
	    );
	}
}