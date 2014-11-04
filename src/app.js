/** @jsx React.DOM */
'use strict';
var React = require('react'),
    App = require('./components/App'),
    AppDispatcher = require('./dispatcher/AppDispatcher');

React.renderComponent(
	<App />,
	document.getElementById('app')
);
