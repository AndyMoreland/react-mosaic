/** @jsx React.DOM */
'use strict';
var React = require('react'),
    ReactWithAddons = require('../../node_modules/react/addons'),
    PaneActions = require('../actions/PaneActions'),
    PaneStore = require('../stores/PaneStore');


var Chunk = React.createClass({displayName: 'Chunk',
    componentWillMount : function() {
console.log('Chunk.componentWillMount');
        var chunk = {};
        PaneActions.mount(this.props.point);
        chunk = PaneStore.getChunk(this.props.point);
        this.setState({
            homePoint : this.props.point,
            image : this.props.image,
            point : chunk.point,
            isCrawable : chunk.isCrawable,
            width: 100 / this.props.matrix[0], // %
            height: 100 / this.props.matrix[1], // %
            edgePx: 0
        });
    },
    componentDidMount: function(){
        this.setState({
            edgePx: this.getDOMNode().clientWidth
        });
        PaneStore.on('change',this._onPaneChange);
console.log('edge',this.state.edgePx);
    },
    componentWillUnmount: function() {
        PaneActions.unmount(this.props.point);
        PaneStore.removeListener('change',this._onPaneChange); // wanna action ???
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            width: 100 / nextProps.matrix[0], // %
            height: 100 / nextProps.matrix[1], // %
            edgePx: this.getDOMNode().clientWidth
        });
console.log('edge',this.state.edgePx);
    },
    render:function(){
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
            React.DOM.div({style:  {position:'relative',top:'70px'} }, "[", this.state.point[0], " , ", this.state.point[1], "]"), 
            React.DOM.div({className: "pane__chunk-border pane__chunk-border_right", style: rightBorderStyles}), 
            React.DOM.div({className: "pane__chunk-border pane__chunk-border_bottom", style: bottomBorderStyles})
        ));
    },

    _onPaneChange : function(){
        var chunk = PaneStore.getChunk(this.state.homePoint);
        if (chunk) {
            this.setState({
                point : chunk.point,
                isCrawable : chunk.isCrawable
            });
        }
    },
    style:function(){
        return {
            backgroundClip: 'border-box',
            backgroundImage : 'url(' + this.state.image.src + ')',
            backgroundRepeat : 'no-repeat',
            backgroundPosition : '-' + this.state.edgePx * this.state.homePoint[0] + 'px' + ' -' + this.state.edgePx * this.state.homePoint[1] + 'px',
            backgroundSize : 100 * this.props.matrix[0] + '%',
            width : this.state.width + '%',
            height : this.state.height + '%',
            left : this.state.width * this.state.point[0] + '%',
            top : this.state.height * this.state.point[1] + '%'
        }
    },
    clickHandler:function(){
        if (this.state.isCrawable && this.props.isGame)
        {
            PaneActions.crawl(this.state.homePoint);
        }
    }
});

module.exports = Chunk;