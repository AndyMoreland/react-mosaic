/** @jsx React.DOM */
'use strict';
var React = require('react'),
    NextButton = React.createClass({displayName: 'NextButton',
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
            return (React.DOM.div({className: "pane__nav pane__nav_next", style: this._style()}, 
                React.DOM.span({className: "pane__nav-icon pane__nav-icon_next mui-icon mdfi_hardware_keyboard_arrow_right", style: this._styleIcon(), onMouseDown: this.state.onMouseDown})
            ));
        },

        _style: function() 
        {
            return {
                display: (!this.props.isGame) ? 'block' : 'none',
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