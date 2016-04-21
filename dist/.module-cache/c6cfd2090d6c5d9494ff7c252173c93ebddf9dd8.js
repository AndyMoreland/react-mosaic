/** @jsx React.DOM */
'use strict';
var React = require('react'),
    ReactWithAddons = require('../../node_modules/react/addons'),
    PaneActions = require('../actions/PaneActions'),
    PaneStore = require('../stores/PaneStore');


var Chunk = React.createClass({displayName: 'Chunk',
    propTypes: 
    {
        point: React.PropTypes.arrayOf(React.PropTypes.number), 
        isGame: React.PropTypes.bool,
        image: React.PropTypes.shape({
            src: React.PropTypes.string,
            koef: React.PropTypes.number,
            scaledWidth: React.PropTypes.number,
            scaledHeight: React.PropTypes.number,
            topOffset: React.PropTypes.number,
            leftOffset: React.PropTypes.number,
        }),
        matrix: React.PropTypes.arrayOf(React.PropTypes.number),
        paneEdge: React.PropTypes.number
    },

    componentWillMount: function() 
    {
        var chunk = {};
        PaneActions.mount(this.props.point);
        chunk = PaneStore.getChunk(this.props.point);
        this.setState({
            homePoint : this.props.point,
            point : chunk.point,
            isCrawable : chunk.isCrawable,
            width: 100 / this.props.matrix[0], // %
            height: 100 / this.props.matrix[1], // %
            edgePx: 0
        });
    },

    componentDidMount: function()
    {
        this.setState({
            edgePx : this.props.paneEdge / this.props.matrix[0]
        });
        PaneStore.on('change',this._onPaneChange);
    },

    componentWillUnmount: function() 
    {
        PaneActions.unmount(this.props.point);
        PaneStore.removeListener('change',this._onPaneChange); // wanna action ???
    },

    componentWillReceiveProps: function(nextProps) 
    {
console.log('componentWillReceiveProps',nextProps);
        this.setState({
            width: 100 / nextProps.matrix[0], // %
            height: 100 / nextProps.matrix[1], // %
            edgePx : nextProps.paneEdge / nextProps.matrix[0]
        });
    },

    render:function()
    {
        var classes = ReactWithAddons.addons.classSet({
                'pane__chunk':true,
                'pane__chunk_crawable':this.state.isCrawable && this.props.isGame
            }),
            rightBorderStyles = {
                display : (this.props.isGame && (this.state.point[0] < this.props.matrix[0] - 1)) ? 'block' : 'none',
                height: this.state.edgePx + 'px'
            },
            bottomBorderStyles = {
                display : (this.props.isGame && (this.state.point[1] < this.props.matrix[1] - 1)) ? 'block' : 'none'
            };

        return (React.DOM.div({className: classes, style: this.style(), onClick: this.clickHandler}, 
            React.DOM.div({className: "pane__chunk-border pane__chunk-border_right", style: rightBorderStyles}), 
            React.DOM.div({className: "pane__chunk-border pane__chunk-border_bottom", style: bottomBorderStyles})
        ));
    },


    _onPaneChange: function()
    {
        var chunk = PaneStore.getChunk(this.state.homePoint);
        if (chunk) {
            this.setState({
                point : chunk.point,
                isCrawable : chunk.isCrawable
            });
        }
    },

    style: function()
    {
        var posX = this.state.edgePx * this.state.homePoint[0] + this.props.image.leftOffset,
            posY = this.state.edgePx * this.state.homePoint[1] + this.props.image.topOffset;

        return {
            backgroundClip: 'border-box',
            backgroundImage : 'url(' + this.props.image.src + ')',
            backgroundRepeat : 'no-repeat',
            backgroundPosition : '-' + posX + 'px ' + '-' + posY + 'px',
            backgroundSize : this.props.image.scaledWidth + 'px ' + this.props.image.scaledHeight + 'px',
            width : this.state.width + '%',
            height : this.state.height + '%',
            left : this.state.width * this.state.point[0] + '%',
            top : this.state.height * this.state.point[1] + '%'
        }
    },

    clickHandler: function()
    {
        if (this.state.isCrawable && this.props.isGame)
        {
            PaneActions.crawl(this.state.homePoint);
        }
    }
});

module.exports = Chunk;