/** @jsx React.DOM */
'use strict';
var React = require('react'),
    ChunksActions = require('../actions/ChunksActions'),
    Menu = require('./Menu'),
    Header = require('./Header'),
    Pane = require('./Pane'),
    App = React.createClass({
        componentWillMount : function(){
            React.initializeTouchEvents(true);
        },
        render : function(){
            return <div className="app">
                <Menu />
                <Header />
                <Pane />
            </div>;
        }
    });

module.exports = App; //
