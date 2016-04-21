/** @jsx React.DOM */
'use strict';
var React = require('react'),
    PaneActions = require('../actions/PaneActions'),
    PaneStore = require('../stores/PaneStore'),
    PaneConstants = require('../constants/PaneConstants'),
    Chunk = require('./Chunk'),
    Pane = React.createClass({displayName: 'Pane',
        getInitialState:function()
        {
            return {
                isGame : false,
                chunks : [],
                image:PaneStore.getImageData(),
                matrix:PaneStore.getMatrixData(),
                startHole:PaneConstants.START_HOLE
            };
        },
        componentDidMount:function(){
            this.setState({
                edge:this.getDOMNode().clientWidth
            });
            PaneStore.on('change',this._onPaneChange);
            PaneStore.on('done',this._onDone);
            this._rebuildChunks();
        },
        componentWillUnmount: function() {
            PaneStore.removeListener('change',this._onPaneChange);
            PaneStore.removeListener('done',this._onDone);
        },
        render: function()
        {
            return (React.DOM.div({className: "pane", style: this._style()}, 
                this.state.chunks.map(function(chunk){
                    return Chunk({point: [chunk.x,chunk.y], isGame: this.state.isGame, image: this.state.image, matrix: this.state.matrix});
                },this)
            ));
        },


        _style : function() {
            return {
                width : this.state.edge + 'px',
                height : this.state.edge + 'px',
                backgroundPosition : '0 0',
                backgroundRepeat : 'no-repeat',
                backgroundImage : (!this.state.isGame) ? 'url(' + this.state.image.src + ')' : 'none',
                backgroundSize : '100%'
            }
        },
        _rebuildChunks : function(){
            var chunks = [];
            this.setState({chunks:[]});

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

            this.setState({chunks:chunks});
        },
        _onPaneChange : function(){
            var matrix = this.state.matrix;
            this.setState({
                image:PaneStore.getImageData(),
                matrix:PaneStore.getMatrixData(),
                hole:PaneConstants.START_HOLE,
                isGame: PaneStore.isGame()
            });
console.info('_onPaneChange',matrix,this.state.matrix,PaneStore.getMatrixData());
            if (matrix[0] !== this.state.matrix[0] || matrix[1] !== this.state.matrix[1]) {
                this._rebuildChunks();    
console.info('_onPaneChange _rebuildChunks',this.state.chunks);
            }
        },
        _onDone : function(){
            var _this = this;
            setTimeout(function(){
                _this.setState({ isGame : false });
                console.info('YOU WIN!'); // todo
            },PaneConstants.ANIMATION_DURATION);

        }
});

module.exports = Pane;