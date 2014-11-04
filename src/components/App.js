/** @jsx React.DOM */
'use strict';
var React = require('react'),
    ChunksActions = require('../actions/ChunksActions'),
    Pane = require('./Pane'),
    App = React.createClass({
        componentDidMount: function(){

        },
        render : function(){
            return <div><Pane /></div>;
        }
    });

module.exports = App;
