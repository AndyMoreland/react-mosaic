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
                    "Images from ", React.DOM.a({href: "https://500px.com", target: "_blanc"}, "500px.com"), 
                    React.DOM.span({className: "five-hundred-px__text"}, " "), 
                    React.DOM.img({className: "five-hundred-px__img", src: "img/500px_logo.png", alt: "500px"})
                ), 
                React.DOM.div({className: "github-source"}, 
                    React.DOM.a({className: "github-source__link", href: "https://github.com/chindyaev/react-mosaic", target: "_blanc"}, 
                        React.DOM.img({className: "github-source__img", src: "img/github.png", alt: "github"})
                    )
                )
            );
        }
    });

module.exports = App; //
