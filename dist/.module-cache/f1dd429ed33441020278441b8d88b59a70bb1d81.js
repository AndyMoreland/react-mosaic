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
            width: this.props.paneEdge / this.props.matrix[0], // px 100 / this.props.matrix[0], // %
            height: this.props.paneEdge / this.props.matrix[1], // px 100 / this.props.matrix[1], // %
            edgePx: 0,
            isMousePressed: false,
            mousePressedCoords: {x:0, y:0},
            dragDist: null, // top|right|bottom|left
            dragX: 0,
            dragY: 0
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
        this.setState({
            width: this.props.paneEdge / this.props.matrix[0], // 100 / nextProps.matrix[0], // %
            height: this.props.paneEdge / this.props.matrix[1], // 100 / nextProps.matrix[1], // %
            edgePx : nextProps.paneEdge / nextProps.matrix[0]
        });
    },

    render:function()
    {
        var classes = ReactWithAddons.addons.classSet({
                'pane__chunk': true,
                'pane__chunk_crawable': this.state.isCrawable && this.props.isGame
            }),
            rightBorderStyles = {
                display: (this.props.isGame && (this.state.point[0] < this.props.matrix[0] - 1)) ? 'block' : 'none',
                height: this.state.edgePx + 'px'
            },
            bottomBorderStyles = {
                display: (this.props.isGame && (this.state.point[1] < this.props.matrix[1] - 1)) ? 'block' : 'none'
            };

        return (React.DOM.div({className: classes, style: this.style(), onMouseDown: this._onMouseDown, onTouchStart: this._onTouchStart, onMouseMove: this._onMouseMove, onTouchMove: this._onTouchMove, onMouseUp: this._onMouseUp}, 
            React.DOM.div({className: "pane__chunk-border pane__chunk-border_right", style: rightBorderStyles}), 
            React.DOM.div({className: "pane__chunk-border pane__chunk-border_bottom", style: bottomBorderStyles})
        ));
    },


    _onPaneChange: function()
    {
        var chunk = PaneStore.getChunk(this.state.homePoint),
            crawlDist = chunk.isCrawable ?this._getDragDist(chunk.point) : null;
        if (chunk) {
            this.setState({
                point: chunk.point,
                isCrawable: chunk.isCrawable,
                crawlDist: crawlDist,
                dragX: 0,
                dragY: 0
            });
        }
    },

    style: function()
    {
        var posX = this.state.edgePx * this.state.homePoint[0] + this.props.image.leftOffset,
            posY = this.state.edgePx * this.state.homePoint[1] + this.props.image.topOffset;

        return {
            display: (this.props.isGame) ? 'block' : 'none',
            backgroundClip: 'border-box',
            backgroundImage: 'url(' + this.props.image.src + ')',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '-' + posX + 'px ' + '-' + posY + 'px',
            backgroundSize: this.props.image.scaledWidth + 'px ' + this.props.image.scaledHeight + 'px',
            width: this.state.width + 'px',
            height: this.state.height + 'px',
            left: (this.state.dragX + this.state.width * this.state.point[0]) + 'px',
            top: (this.state.dragY + this.state.height * this.state.point[1]) + 'px'
        }
    },


    _onClick: function()
    {
console.log('_onClick');
        if (this.state.isCrawable && this.props.isGame)
        {
            PaneActions.crawl(this.state.homePoint);
        }
    },

    _onMouseDown: function(e){
        this.setState({
            isMousePressed: true,
            mousePressedCoords: {x: e.clientX, y: e.clientY}
        });
//console.log('_onMouseDown',e.clientX,e.clientY);
    },

    _onTouchStart: function(e){
console.log('_onTouchStart',e);
    for (var key in e)
    {
        console.log(key,e[key]);
    }

    },

    _onMouseMove: function(e){
        var dx, dy;
        if (this.state.isMousePressed)
        {
            switch (this.state.crawlDist)
            {
                case 'top':
                    dy = e.clientY - this.state.mousePressedCoords.y; 
console.log('_onMouseMove top',dy);
                    if (dy <= 0 && Math.abs(dy) <= this.state.edgePx){
                        this.setState({ dragY: dy });
                    }
                    break;
                case 'bottom':
                    dy = e.clientY - this.state.mousePressedCoords.y; 
console.log('_onMouseMove bottom',dy);
                    if (dy >= 0 && Math.abs(dy) <= this.state.edgePx){
                        this.setState({ dragY: dy });
                    }
                    break;     
                case 'left':
console.log('_onMouseMove left',dy);
                    dx = e.clientX - this.state.mousePressedCoords.x; 
                    if (dx <= 0 && Math.abs(dx) <= this.state.edgePx){
                        this.setState({ dragX: dx });
                    }
                    break;     
                case 'right':
                    dx = e.clientX - this.state.mousePressedCoords.x; 
console.log('_onMouseMove right',dy);
                    if (dx >= 0 && Math.abs(dx) <= this.state.edgePx){
                        this.setState({ dragX: dx });
                    }
                    break;
            }
        }


    },

    _onTouchMove: function(e){
console.log('_onTouchMove',e);

    },

    _onMouseUp: function(e){
        var state = {},
            dx,
            dy,
            dragX = 0, 
            dragY = 0,
            isCrawl = false;

        switch (this.state.crawlDist)
        {
            case 'top':
                dy = e.clientY - this.state.mousePressedCoords.y;
console.log('_onMouseUp',dy,this.state.edgePx);
                if (dy < 0 && Math.abs(dy) < this.state.edgePx && Math.abs(dy) > this.state.edgePx / 2){
                    isCrawl = true;
                }
                break;
            case 'bottom':
                dy = e.clientY - this.state.mousePressedCoords.y; 
console.log('_onMouseUp',dy,this.state.edgePx);
                if (dy > 0 && Math.abs(dy) < this.state.edgePx && Math.abs(dy) > this.state.edgePx / 2){
                    isCrawl = true;
                }
                break;     
            case 'left':
                dx = e.clientX - this.state.mousePressedCoords.x; 
console.log('_onMouseUp',dx,this.state.edgePx);
                if (dx < 0 && Math.abs(dx) < this.state.edgePx && Math.abs(dx) > this.state.edgePx / 2){
                    isCrawl = true;
                }
                break;     
            case 'right':
                dx = e.clientX - this.state.mousePressedCoords.x; 
console.log('_onMouseUp',dx,this.state.edgePx);
                if (dx > 0 && Math.abs(dx) < this.state.edgePx && Math.abs(dx) > this.state.edgePx / 2){
                    isCrawl = true;
                }
                break;
        }
console.log('_onMouseUp isCrawl',isCrawl,this.state.isCrawable,this.props.isGame);
        state.isMousePressed = false;

        if (isCrawl && this.state.isCrawable && this.props.isGame){
console.log('_onMouseUp 1');
            this.setState(state);
            PaneActions.crawl(this.state.homePoint);
        } else {
console.log('_onMouseUp 2');
            state.dragX = 0;
            state.dragY = 0;
            this.setState(state);
        }
    },

    _getDragDist: function(point){
        var crawlDist, 
            hole = PaneStore.getHole(),
            shift;

        if ((point[0] - hole[0]) === 0){
            shift = point[1] - hole[1];
            if (shift === 1) crawlDist = 'top';
            if (shift === -1) crawlDist = 'bottom';
        } else if ((point[1] - hole[1]) === 0){
            shift = point[0] - hole[0];
            if (shift === 1) crawlDist = 'left';
            if (shift === -1) crawlDist = 'right';
        }

        return crawlDist;
    }

});

module.exports = Chunk;