/** @jsx React.DOM */
'use strict';
var React = require('react'),
    ReactWithAddons = require('../../node_modules/react/addons'),
    HeaderActions = require('../actions/HeaderActions'),
    PaneActions = require('../actions/PaneActions'),
    PaneStore = require('../stores/PaneStore'),
    mui = require('material-ui'),
    localImageProvider = require('../imageProviders/localImageProvider'),
    DropDownMenu = mui.DropDownMenu,
    Dialog = mui.Dialog,
    PaperButton = mui.PaperButton,
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
            var gameIcon = (this.state.isGame) ? 'av-replay' : 'av-play-arrow';

            return (React.DOM.div({className: "toolbar-container"}, 

                Dialog({ref: "matrixDialog", title: "Set matrix"}, 
                    React.DOM.div({className: "toolbar-container__dialog-link", onMouseDown: this._setMatrix33}, "3x3"), 
                    React.DOM.div({className: "toolbar-container__dialog-link", onMouseDown: this._setMatrix44}, "4x4"), 
                    React.DOM.div({className: "toolbar-container__dialog-link", onMouseDown: this._setMatrix55}, "5x5")
                ), 

                React.DOM.div({className: "toolbar-landscape"}, 
                    React.DOM.div({className: "toolbar-landscape__section"}, 
                        Icon({icon: "image-grid-on", onMouseDown: this._onMatrixMouseDown})
                    ), 
                    React.DOM.div({className: "toolbar-landscape__section"}, 
                        Icon({icon: "image-photo-library", onMouseDown: this._onImageMouseDown})
                    ), 
                    React.DOM.div({className: "toolbar-landscape__section"}, 
                        Icon({icon: gameIcon, onMouseDown: this._onPlayMouseDown})
                    )
                ), 

                React.DOM.div({className: "toolbar-portrait mui-app-bar grid_cols_12"}, 
                    React.DOM.div({className: "grid__module grid__module_col_1 grid__module_span_4 toolbar-portrait__section-wrap"}, 
                        React.DOM.div({className: "toolbar-portrait__section"}, 
                            Icon({icon: "image-grid-on", onMouseDown: this._onMatrixMouseDown})
                        )
                    ), 
                    React.DOM.div({className: "grid__module grid__module_col_5 grid__module_span_4 toolbar-portrait__section-wrap"}, 
                        React.DOM.div({className: "toolbar-portrait__section"}, 
                            Icon({icon: "image-photo-library", onMouseDown: this._onImageMouseDown})
                        )
                    ), 
                    React.DOM.div({className: "grid__module grid__module_col_9 grid__module_span_4 toolbar-portrait__section-wrap"}, 
                        React.DOM.div({className: "toolbar-portrait__section"}, 
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
            localImageProvider.start();
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
            if (this.state.isGame){
                PaneActions.gameRollback();
            }
            PaneActions.setMatrix([dim,dim]);
            this.refs.matrixDialog.dismiss();
        }
    });

module.exports = Header;

