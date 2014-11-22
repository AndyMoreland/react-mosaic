/** @jsx React.DOM */
'use strict';
var React = require('react'),
    MenuStore = require('../stores/MenuStore'),
    mui = require('material-ui'),
    LeftNav = mui.LeftNav,
    Menu = React.createClass({
        getInitialState : function(){
            return {
                isOpen : false,
                menuItems : [
                    { text:'Random image', payload : 'random', icon: 'av-shuffle' },
                    //{ text:'Flick', payload : 'random' },
                    { text:'Set 3x3 matrix', payload: 'matrix33', icon: 'image-grid-on' },
                    { text:'Set 4x4 matrix', payload: 'matrix44', icon: 'image-grid-on' },
                    { text:'Set 5x5 matrix', payload: 'matrix55', icon: 'image-grid-on' },
                    { text:'Close', action: 'hide', icon: 'navigation-arrow-back' }
                ]
            };
        },
        componentDidMount : function(){
            MenuStore.on('toggle',this._onToggle);
        },
        render : function(){
            return <LeftNav ref='menu' docked={false} menuItems={this.state.menuItems} onChange={this._onMenuItemClick} />;
        },

        _onToggle : function(){
            this.refs['menu'].toggle();
        },
        _onMenuItemClick : function(e,key,payload){
            switch (payload.action)
            {
                case 'hide': this.refs['menu'].toggle(); break;
                default : break;
            }
        }

    });

module.exports = Menu;
