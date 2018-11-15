import React, { Component } from 'react';
import { Books } from '../api/collections.js';

export default class Book extends Component {
	render() {	
		return (
	      <li className="bookForSale">
	        <p id="bookName" className="bookAttr">Title: { this.props.book.title }</p>
	        <p id="bookIsbn" className="bookAttr">ISBN: { this.props.book.isbn }</p>
	        <p id="bookClass" className="bookAttr">Class: { this.props.book.className }</p>
	        <p id="bookPrice" className="bookAttr">Price: ${ this.props.book.price }</p>
	      </li>
	    );
	}
}