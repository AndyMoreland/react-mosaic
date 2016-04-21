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
                React.DOM.div({className: "five-hundred-px"}, 
                    React.DOM.span({className: "five-hundred-px__text"}, "Images taken from"), 
                    React.DOM.img({className: "five-hundred-px__img", src: "img/500px_logo.png", alt: "500px"})
                )
            );
        }
    });

module.exports = App; //
