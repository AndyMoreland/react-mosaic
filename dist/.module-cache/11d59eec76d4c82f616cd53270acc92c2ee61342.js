/** @jsx React.DOM */
'use strict';
var React = require('react'),
    ReactWithAddons = require('../../node_modules/react/addons'),
    HeaderActions = require('../actions/HeaderActions'),
    PaneActions = require('../actions/PaneActions'),
    PaneStore = require('../stores/PaneStore'),
    mui = require('material-ui'),
    DropDownMenu = mui.DropDownMenu,
    Dialog = mui.Dialog,
    Icon = mui.Icon,
    Header = React.createClass({displayName: 'Header',
        getInitialState : function(){
            return {
                isGame : false
            }
        },
        componentDidMount : function(){
            PaneStore.on('change',this._onPaneChange);
        },
        render : function(){
            var gameIcon = (this.state.isGame) ? 'av-replay' : 'av-play-arrow',
                dialogActions = [
                    { text: '3x3', onClick : this._setMatrix33 },
                    { text: '4x4', onClick: this._setMatrix44 },
                    { text: '5x5', onClick: this._setMatrix55 },
                    { text: 'CANCEL' }
                ];

            return (React.DOM.div({className: "toolbar"}, 
                Dialog({ref: "matrixDialog", title: "Set matrix", actions: dialogActions}), 
                React.DOM.div({className: "mui-app-bar grid_cols_12"}, 
                    React.DOM.div({className: "grid__module grid__module_col_1 grid__module_span_4 toolbar__section-wrap"}, 
                        React.DOM.div({className: "toolbar__section"}, 
                            Icon({icon: "image-grid-on", onMouseDown: this._onMatrixMouseDown})
                        )
                    ), 
                    React.DOM.div({className: "grid__module grid__module_col_5 grid__module_span_4 toolbar__section-wrap"}, 
                        React.DOM.div({className: "toolbar__section"}, 
                            Icon({icon: "image-photo-library", onMouseDown: this._onImageMouseDown})
                        )
                    ), 
                    React.DOM.div({className: "grid__module grid__module_col_9 grid__module_span_4 toolbar__section-wrap"}, 
                        React.DOM.div({className: "toolbar__section"}, 
                            Icon({icon: gameIcon, onMouseDown: this._onPlayMouseDown})
                        )
                    )
                )
            ));
        },

        _onPaneChange : function(){
            this.setState({
                isGame : PaneStore.isGame()
            });
        },
        _onMatrixMouseDown : function(){
            this.refs.matrixDialog.show();
        },
        _onImageMouseDown : function(){

        },
        _onPlayMouseDown : function(){
            if (this.state.isGame){
                PaneActions.gameRollback();
            } else {
                PaneActions.gameStart();
            }
        },
        _setMatrix33 : function() {this._setMatrix(3)},
        _setMatrix44 : function() {this._setMatrix(4)},
        _setMatrix55 : function() {this._setMatrix(5)},
        _setMatrix : function(dim){
console.info(dim);
            if (this.state.isGame){
                PaneActions.gameRollback();
            }
            PaneActions.setMatrix([dim,dim]);
            this.refs.matrixDialog.dismiss();
        }
    });

module.exports = Header;

