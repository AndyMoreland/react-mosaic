/** @jsx React.DOM */
'use strict';
var React = require('react'),
    ReactWithAddons = require('../../node_modules/react/addons'),
    HeaderActions = require('../actions/HeaderActions'),
    mui = require('material-ui'),
    Toolbar = mui.Toolbar,
    IconButton = mui.IconButton,
    Header = React.createClass({
        componentDidMount : function(){

        },
        render : function(){
            return <Toolbar>
                <IconButton icon="navigation-menu" onClick={this._onNavBtnClick} />
            </Toolbar>;
        },

        _onNavBtnClick : function(){
console.log('_onNavBtnClick');
            HeaderActions.menuToggle();

        }
    });

module.exports = Header;

