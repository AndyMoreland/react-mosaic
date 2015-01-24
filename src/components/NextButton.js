/** @jsx React.DOM */
'use strict';
var React = require('react'),
    NextButton = React.createClass({
        propTypes: 
        {
            isGame: React.PropTypes.bool,
            paneEdge: React.PropTypes.number,
            onMouseDown: React.PropTypes.func 
        },
        getInitialState: function()
        {
            return {
                size: 0
            };
        },

        componentWillReceiveProps: function(props)
        {
            this.setState({
                size: props.paneEdge / 6
            });
        },

        render: function()
        {
            return (<div className='pane__nav pane__nav_next' style={this._style()}>
                <span className="pane__nav-icon pane__nav-icon_next mui-icon mdfi_hardware_keyboard_arrow_right" style={this._styleIcon()} onMouseDown={this.props.onMouseDown}></span>
            </div>);
        },

        _style: function() 
        {
            return {
                display: (!this.props.isGame) ? 'block' : 'none',
                right: 0,
                top: this.props.paneEdge / 2 - this.state.size / 2 + 'px'
            }
        },

        _styleIcon: function() 
        {
            return {
                fontSize: this.state.size + 'px'
            }
        }
});

module.exports = NextButton;