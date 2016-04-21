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
                React.DOM.div({className: "sign"}, 
                    "Images from ", React.DOM.a({href: "https://500px.com", target: "_blanc"}, "500px.com"), React.DOM.br(null), 
                    "designed by ", React.DOM.a({href: "https://github.com/chindyaev/react-mosaic", target: "_blanc"}, "chindyaev")
                )
            );
        }
    });

module.exports = App; //
