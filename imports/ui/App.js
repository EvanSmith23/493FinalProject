import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Books } from '../api/collections.js';
import { Users } from '../api/collections.js';

class App extends Component {

	constructor(props) {
    	super(props);
    }

    render() {
	    return (
	      <div className="container">
	        <header>
	          <h1>This is our App</h1>
	        </header>
	      </div>
	    );
  	}
}

export default withTracker(() => {
  return {};
})(App);