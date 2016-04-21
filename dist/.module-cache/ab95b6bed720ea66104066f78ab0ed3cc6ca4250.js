/** @jsx React.DOM */
'use strict';
var React = require('react'),
    ReactWithAddons = require('../../node_modules/react/addons'),
    PaneActions = require('../actions/PaneActions'),
    PaneConstants = require('../constants/PaneConstants'),
    PaneStore = require('../stores/PaneStore');


var data = {
        isTouching: false,
        touchTimestamp: null,
        touchStartCoords: {x:0, y:0},
        dragDist: null // top|right|bottom|left
    },
    Chunk = React.createClass({displayName: 'Chunk',
    propTypes: 
    {
        point: React.PropTypes.arrayOf(React.PropTypes.number), 
        isGame: React.PropTypes.bool,
        isSpying: React.PropTypes.bool,
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
            homePoint: this.props.point,
            point: chunk.point,
            isCrawable: chunk.isCrawable,
            width: this.props.paneEdge / this.props.matrix[0], // px 100 / this.props.matrix[0], // %
            height: this.props.paneEdge / this.props.matrix[1], // px 100 / this.props.matrix[1], // %
            edgePx: 0,
            dragX: 0,
            dragY: 0
        });
    },

    componentDidMount: function()
    {
        this.setState({
            edgePx: this.props.paneEdge / this.props.matrix[0]
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
            edgePx: nextProps.paneEdge / nextProps.matrix[0]
        });
    },

    render: function()
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

        return (React.DOM.div({className: classes, style: this.style(), onMouseDown: this._onMouseDown, onTouchStart: this._onTouchStart, onMouseMove: this._onMouseMove, onTouchMove: this._onTouchMove, onMouseUp: this._onMouseUp, onMouseLeave: this._onMouseLeave, onMouseOut: this._onMouseOut, onTouchEnd: this._onTouchEnd}, 
            React.DOM.div({className: "pane__chunk-border pane__chunk-border_right", style: rightBorderStyles}), 
            React.DOM.div({className: "pane__chunk-border pane__chunk-border_bottom", style: bottomBorderStyles})
        ));
    },


    _onPaneChange: function()
    {
        var chunk = PaneStore.getChunk(this.state.homePoint);
        data.dragDist = (chunk && chunk.isCrawable) ? this._getDragDist(chunk.point) : null;

        if (chunk) {
            this.setState({
                point: chunk.point,
                isCrawable: chunk.isCrawable,
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
            display: (this.props.isGame && !this.state.isSpying) ? 'block' : 'none',
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
        if (this.state.isCrawable && this.props.isGame)
        {
            PaneActions.crawl(this.state.homePoint);
        }
    },

    _onMouseDown: function(e){
        this._dragStart(e.clientX, e.clientY);
    },

    _onTouchStart: function(e){
        this._dragStart(Math.floor(e.touches[0].clientX), Math.floor(e.touches[0].clientY));
    },

    _onMouseMove: function(e){
        this._dragMove(e.clientX, e.clientY);
    },

    _onTouchMove: function(e){
        this._dragMove(Math.floor(e.touches[0].clientX), Math.floor(e.touches[0].clientY));
    },

    _onMouseUp: function(e){
        this._dragEnd(e.clientX, e.clientY);
    },

    _onMouseLeave: function(e){
        this._dragEnd(e.clientX, e.clientY);
    },

    _onMouseOut: function(e){
        this._dragEnd(e.clientX, e.clientY);
    },

    _onTouchEnd: function(e){
        this._dragEnd(Math.floor(e.changedTouches[0].clientX), Math.floor(e.changedTouches[0].clientY));
    },

    _onTouchCancel: function(e){
        this._dragEnd(Math.floor(e.changedTouches[0].clientX), Math.floor(e.changedTouches[0].clientY));
    },

    _getDragDist: function(point){
        var dragDist, 
            hole = PaneStore.getHole(),
            shift;

        if ((point[0] - hole[0]) === 0){
            shift = point[1] - hole[1];
            if (shift === 1) dragDist = 'top';
            if (shift === -1) dragDist = 'bottom';
        } else if ((point[1] - hole[1]) === 0){
            shift = point[0] - hole[0];
            if (shift === 1) dragDist = 'left';
            if (shift === -1) dragDist = 'right';
        }

        return dragDist;
    },

    _dragStart: function(x,y){
        data.isTouching = true;
        data.touchTimestamp = Date.now();
        data.touchStartCoords = {x: x, y: y};
    },

    _dragMove: function(x,y){
        var dx, dy;
        if (data.isTouching)
        {
            switch (data.dragDist)
            {
                case 'top':
                    dy = y - data.touchStartCoords.y; 
                    if (dy <= 0 && Math.abs(dy) <= this.state.edgePx){
                        this.setState({ dragY: dy });
                    }
                    break;
                case 'bottom':
                    dy = y - data.touchStartCoords.y; 
                    if (dy >= 0 && Math.abs(dy) <= this.state.edgePx){
                        this.setState({ dragY: dy });
                    }
                    break;     
                case 'left':
                    dx = x - data.touchStartCoords.x; 
                    if (dx <= 0 && Math.abs(dx) <= this.state.edgePx){
                        this.setState({ dragX: dx });
                    }
                    break;     
                case 'right':
                    dx = x - data.touchStartCoords.x; 
                    if (dx >= 0 && Math.abs(dx) <= this.state.edgePx){
                        this.setState({ dragX: dx });
                    }
                    break;
            }
        }
    },

    _dragEnd: function(x,y){
        var state = {},
            dx,
            dy,
            dragX = 0, 
            dragY = 0,
            isCrawl = false;
        if (data.isTouching)
        {
            if (data.touchTimestamp && Date.now() - data.touchTimestamp < PaneConstants.CLICK_DELAY) {
                isCrawl = true;
            } else {
                switch (data.dragDist)
                {
                    case 'top':
                        dy = y - data.touchStartCoords.y;
                        if (dy < 0 /*&& Math.abs(dy) < this.state.edgePx && Math.abs(dy) > this.state.edgePx / 2*/){
                            isCrawl = true;
                        }
                        break;
                    case 'bottom':
                        dy = y - data.touchStartCoords.y; 
                        if (dy > 0 /*&& Math.abs(dy) < this.state.edgePx && Math.abs(dy) > this.state.edgePx / 2*/){
                            isCrawl = true;
                        }
                        break;     
                    case 'left':
                        dx = x - data.touchStartCoords.x; 
                        if (dx < 0 /*&& Math.abs(dx) < this.state.edgePx && Math.abs(dx) > this.state.edgePx / 2*/){
                            isCrawl = true;
                        }
                        break;     
                    case 'right':
                        dx = x - data.touchStartCoords.x; 
                        if (dx > 0 /*&& Math.abs(dx) < this.state.edgePx && Math.abs(dx) > this.state.edgePx / 2*/){
                            isCrawl = true;
                        }
                        break;
                }                
            }

        }

        data.isTouching = false;

        if (isCrawl && this.state.isCrawable && this.props.isGame){
            PaneActions.crawl(this.state.homePoint);
        } else {
            this.setState({
                dragX: 0,
                dragY: 0
            });
        }
    }

});

module.exports = Chunk;