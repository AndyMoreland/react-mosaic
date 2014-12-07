/** @jsx React.DOM */
'use strict';
var React = require('react'),
    Toolbar = require('./Toolbar'),
    Pane = require('./Pane'),
    App = React.createClass({
        componentWillMount : function(){
            React.initializeTouchEvents(true);
        },
        render : function(){
            return <div className="app">
                <Pane />
                <Toolbar />
            </div>;
        }
    });

module.exports = App; //
