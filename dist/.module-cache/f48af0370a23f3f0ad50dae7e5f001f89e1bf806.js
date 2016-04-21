/** @jsx React.DOM */
'use strict';
var React = require('react'),
    PaneActions = require('../actions/PaneActions'),
    PaneStore = require('../stores/PaneStore'),
    PaneConstants = require('../constants/PaneConstants'),
    Chunk = require('./Chunk'),
    Pane = React.createClass({displayName: 'Pane',
        getInitialState: function()
        {
            var storeImage = PaneStore.getImageData(),
                isVerticalImage = storeImage.height > storeImage.width;

            storeImage.topOffset = 0;
            storeImage.leftOffset = 0;

            return {
                isGame: false,
                chunks: [],
                image: storeImage,
                matrix: PaneStore.getMatrixData(),
                startHole: PaneConstants.START_HOLE
            };
        },

        componentDidMount: function()
        {
console.info('componentDidMount');
            var isVerticalPage = window.innerWidth / window.innerHeight < 1,
                edge = (isVerticalPage) ? window.innerWidth : window.innerHeight, 
                image = this.state.image,
                imageKoef = image.height / image.width,
                isVerticalImage = imageKoef > 1;
console.info('isVerticalPage',isVerticalPage);
console.info('edge',edge);
console.info('imageKoef',imageKoef);
console.info('isVerticalImage',isVerticalImage);

            if (isVerticalImage) 
            {
                image.scaledHeight = edge * imageKoef;
                image.scaledWidth = image.scaledHeight / imageKoef;
                image.topOffset = (image.scaledHeight - edge) / 2;
console.info('1 scaledHeight, scaledWidth, topOffset',image.scaledHeight,image.scaledWidth, image.topOffset);
            } else 
            {
                image.scaledWidth = edge * imageKoef;
                image.scaledHeight = image.scaledWidth / imageKoef;
                image.leftOffset = (image.scaledWidth - edge) / 2;
console.info('2 scaledWidth, scaledHeight, leftOffset',image.scaledWidth,image.scaledHeight, image.leftOffset);
            }

            this.setState({
                edge: edge,
                image: image
            });

            PaneStore.on('change',this._onPaneChange);
            PaneStore.on('done',this._onDone);
        },

        componentWillUnmount: function() 
        {
            PaneStore.removeListener('change',this._onPaneChange);
            PaneStore.removeListener('done',this._onDone);
        },

        render: function()
        {
            var chunks = [],
                chunkImage = {
                    src: this.state.image.src,
                    scaledWidth: this.state.image.scaledWidth,
                    scaledHeight: this.state.image.scaledHeight,
                    topOffset: this.state.image.topOffset,
                    leftOffset: this.state.image.leftOffset
                };

            for (var x = 0; x < this.state.matrix[0]; x++)
            {
                for (var y = 0; y < this.state.matrix[1]; y++)
                {
                    if (!(x===this.state.startHole[0] && y===this.state.startHole[1]))
                    {
                        chunks.push({ x:x, y:y });
                    }
                }
            }

            return (React.DOM.div({className: "pane", style: this._style()}, 
                chunks.map(function(chunk){
                    return Chunk({
                        key: 'chunk_'+chunk.x+chunk.y, 
                        point: [chunk.x,chunk.y], 
                        isGame: this.state.isGame, 
                        image: chunkImage, 
                        matrix: this.state.matrix, 
                        paneEdge: this.state.edge});
                },this)
            ));
        },


        _style : function() 
        {
            return {
                width : this.state.edge + 'px',
                height : this.state.edge + 'px',
                backgroundPositionX : '-' + this.state.image.leftOffset,
                backgroundPositionY : '-' + this.state.image.topOffset,
                backgroundRepeat : 'no-repeat',
                backgroundImage : (!this.state.isGame) ? 'url(' + this.state.image.src + ')' : 'none',
                backgroundSize : 'cover'
            }
        },

        _onPaneChange : function()
        {
            this.setState({
                image:PaneStore.getImageData(),
                matrix: PaneStore.getMatrixData(),
                hole:PaneConstants.START_HOLE,
                isGame: PaneStore.isGame()
            });
        },

        _onDone : function()
        {
            var _this = this;
            setTimeout(function(){
                _this.setState({ isGame : false });
                console.info('YOU WIN!'); // todo
            },PaneConstants.ANIMATION_DURATION);

        }
});

module.exports = Pane;