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
                <div className='sign'>
                    Images from <a href='https://500px.com' target='_blanc'>500px.com</a><br/>
                    designed by <a href='https://github.com/chindyaev/react-mosaic' target='_blanc'>chindyaev</a>
                </div>
            </div>;
        }
    });

module.exports = App; //
