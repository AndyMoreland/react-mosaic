/** @jsx React.DOM */
'use strict';
var React = require('react'),
    ReactWithAddons = require('../../node_modules/react/addons'),
    ChunksActions = require('../actions/ChunksActions'),
    ChunksStore = require('../stores/ChunksStore');


var Chunk = React.createClass({
    componentWillMount : function() {
        var chunk = {};
        ChunksActions.mount(this.props.point);
        chunk = ChunksStore.getChunk(this.props.point);
        this.setState({
            homePoint : this.props.point,
            image : this.props.image,
            matrix : this.props.matrix,
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
        ChunksStore.on('change',this._onChunksChange);
    },
    componentWillUnmount: function() {
        ChunksActions.unMount(this.state.homePoint);
        ChunksStore.removeListener('change',this._onChunksChange); // wanna action ???
    },
    render:function(){
        var classes = ReactWithAddons.addons.classSet({
                'pane__chunk':true,
                'pane__chunk_crawable':this.state.isCrawable && this.props.isGame
            }),
            rightBorderStyles = {
                display : (this.props.isGame && (this.state.point[0] < this.state.matrix[0] - 1)) ? 'block' : 'none',
                height: this.state.edgePx + 'px'
            },
            bottomBorderStyles = {
                display : (this.props.isGame && (this.state.point[1] < this.state.matrix[1] - 1)) ? 'block' : 'none'
            };

        return (<div className={classes} style={this.style()} onClick={this.clickHandler}>
            <div className='pane__chunk-border pane__chunk-border_right' style={rightBorderStyles}></div>
            <div className='pane__chunk-border pane__chunk-border_bottom' style={bottomBorderStyles}></div>
        </div>);
    },

    _onChunksChange : function(){
        var chunk = ChunksStore.getChunk(this.state.homePoint);
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
            backgroundSize : 100 * this.state.matrix[0] + '%',
            width : this.state.width + '%',
            height : this.state.height + '%',
            left : this.state.width * this.state.point[0] + '%',
            top : this.state.height * this.state.point[1] + '%'
        }
    },
    clickHandler:function(){
        if (this.state.isCrawable && this.props.isGame)
        {
            ChunksActions.crawl(this.state.homePoint);
        }
    }
});

module.exports = Chunk;