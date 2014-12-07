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
    PaperButton = mui.PaperButton,
    Icon = mui.Icon,
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
            var gameIcon = (this.state.isGame) ? 'av-replay' : 'av-play-arrow';

            return (<div className="toolbar-container">

                <Dialog ref="matrixDialog" title="Set matrix">
                    <div className="toolbar-container__dialog-link" onMouseDown={this._setMatrix33}>3x3</div>
                    <div className="toolbar-container__dialog-link" onMouseDown={this._setMatrix44}>4x4</div>
                    <div className="toolbar-container__dialog-link" onMouseDown={this._setMatrix55}>5x5</div>
                </Dialog>

                <div className="toolbar-landscape">
                    <div className="toolbar-landscape__section">
                        <Icon icon="image-grid-on" onMouseDown={this._onMatrixMouseDown}/>
                    </div>
                    <div className="toolbar-landscape__section">
                        <Icon icon="image-photo-library" onMouseDown={this._onImageMouseDown}/>
                    </div>
                    <div className="toolbar-landscape__section">
                        <Icon icon={gameIcon} onMouseDown={this._onPlayMouseDown}/>
                    </div>                                        
                </div>

                <div className="toolbar-portrait mui-app-bar grid_cols_12">
                    <div className="grid__module grid__module_col_1 grid__module_span_4 toolbar-portrait__section-wrap">
                        <div className="toolbar-portrait__section">
                            <Icon icon="image-grid-on" onMouseDown={this._onMatrixMouseDown}/>
                        </div>
                    </div>
                    <div className="grid__module grid__module_col_5 grid__module_span_4 toolbar-portrait__section-wrap">
                        <div className="toolbar-portrait__section">
                            <Icon icon="image-photo-library" onMouseDown={this._onImageMouseDown} />
                        </div>
                    </div>
                    <div className="grid__module grid__module_col_9 grid__module_span_4 toolbar-portrait__section-wrap">
                        <div className="toolbar-portrait__section">
                            <Icon icon={gameIcon} onMouseDown={this._onPlayMouseDown} />
                        </div>
                    </div>
                </div>

            </div>);
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
            if (this.state.isGame){
                PaneActions.gameRollback();
            }
            PaneActions.setMatrix([dim,dim]);
            this.refs.matrixDialog.dismiss();
        }
    });

module.exports = Header;

