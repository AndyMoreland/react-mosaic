/** @jsx React.DOM */
'use strict';
var React = require('react'),
    Toolbar = require('./Toolbar'),
    Pane = require('./Pane'),
    App = React.createClass({displayName: 'App',
        componentWillMount : function(){
            React.initializeTouchEvents(true);
        },
        render : function(){
            return React.DOM.div({className: "app"}, 
                Pane(null), 
                Toolbar(null), 
                React.DOM.div({className: "500px"}, "Images taken from ", React.DOM.img({src: "img/500px_logo.png", alt: "500px"}))
            );
        }
    });

module.exports = App; //
