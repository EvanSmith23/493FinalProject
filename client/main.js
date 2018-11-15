import React from 'react';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.js';
import './main.html';

Meteor.startup(() => {
	render(<App />, document.getElementById('render-target'));
});