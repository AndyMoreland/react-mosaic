/** @jsx React.DOM */
'use strict';
var React = require('react'),
    ReactWithAddons = require('../../node_modules/react/addons'),
    HeaderActions = require('../actions/HeaderActions'),
    PaneActions = require('../actions/PaneActions'),
    PaneStore = require('../stores/PaneStore'),
    mui = require('material-ui'),
    Toolbar = mui.Toolbar,
    IconButton = mui.IconButton,
    Header = React.createClass({
        getInitialState : function(){
            return {
                isGame : false
            }
        },
        componentDidMount : function(){
            PaneStore.on('change',this._onPaneChange);
        },
        render : function(){
            var playIcon = (!this.state.isGame) ? 'av-play-arrow' : 'action-autorenew';

            return <Toolbar>
                <IconButton icon="navigation-menu" onClick={this._onNavBtnClick} />
                <IconButton icon={playIcon} onClick={this._onPlayBtnClick} />
                <IconButton icon="av-shuffle" onClick={this._onRandomBtnClick} />
            </Toolbar>;
        },

        _onPaneChange : function(){
            this.setState({
                isGame : PaneStore.isGame()
            });
        },
        _onNavBtnClick : function(){
            HeaderActions.menuToggle();
        },
        _onPlayBtnClick : function(){
            if (this.state.isGame){
                PaneActions.gameRollback();
            } else {
                PaneActions.gameStart();
            }
        },
        _onRandomBtnClick : function(){

        }
    });

module.exports = Header;

