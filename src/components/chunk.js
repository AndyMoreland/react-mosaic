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
            height: 100 / this.props.matrix[1] // %
        });
    },
    componentDidMount: function(){
        ChunksStore.on('change',this._onChunksChange);
    },
    componentWillUnmount: function() {
        ChunksActions.unMount(this.state.homePoint);
        ChunksStore.removeListener('change',this._onChunksChange); // wanna action ???
    },
    render:function(){
        var classes = ReactWithAddons.addons.classSet({
            'pane__chunk':true,
            'pane__chunk_crawable':this.state.isCrawable && this.props.isGame,
            'pane__chunk_border-right': this.props.isGame && (this.state.point[0] < this.state.matrix[0] - 1),
            'pane__chunk_border-bottom': this.props.isGame && (this.state.point[1] < this.state.matrix[1] - 1)
        });
        return <div className={classes} style={this.style()} onClick={this.clickHandler}></div>;
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
            'backgroundImage' : 'url(' + this.state.image.src + ')',
            'backgroundRepeat' : 'no-repeat',
            'backgroundPositionX' : '-' + this.state.image.width / this.state.matrix[0] * this.state.homePoint[0] + 'px',
            'backgroundPositionY' : '-' + this.state.image.height / this.state.matrix[1] * this.state.homePoint[1] + 'px',
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