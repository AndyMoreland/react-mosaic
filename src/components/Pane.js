/** @jsx React.DOM */
'use strict';
var React = require('react'),
    PaneActions = require('../actions/PaneActions'),
    ChunksActions = require('../actions/ChunksActions'),
    PaneStore = require('../stores/PaneStore'),
    ChunksStore = require('../stores/ChunksStore'),
    PaneConstants = require('../constants/PaneConstants'),
    ChunksConstants = require('../constants/ChunksConstants'),
    Chunk = require('./Chunk'),
    Pane = React.createClass({
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
            this.startGame();
            PaneStore.on('change',this._onPaneChange);
            ChunksStore.on('done',this._onDone);
        },
        componentWillUnmount: function() {
            PaneStore.removeListener('change',this._onPaneChange);
            ChunksStore.removeListener('done',this._onDone);
        },
        render: function()
        {
            var chunks = [];
            for (var x = 0; x < this.state.matrix[0]; x++){
                for (var y = 0; y < this.state.matrix[1]; y++) {
                    if (!(x===this.state.startHole[0] && y===this.state.startHole[1])){
                        chunks.push({ x:x, y:y });
                    }
                }
            }

            return (<div className='pane' style={this.style()}>
                {chunks.map(function(chunk){
                    return <Chunk ref={'chunk'+chunk.x+chunk.y} key={'chunk-'+chunk.x+chunk.y} point={[chunk.x,chunk.y]} image={this.state.image} matrix={this.state.matrix} />;
                },this)}
            </div>);
        },

        startGame : function(){
            var _this = this;
            setTimeout(function(){
                PaneActions.gameStart();
                ChunksActions.shuffle();
                _this.setState({ isGame : true });
            },500); // todo
        },
        style : function() {
            return {
                'width' : this.state.edge + 'px',
                'height' : this.state.edge + 'px',
                'backgroundPosition' : '0 0',
                'backgroundRepeat' : 'no-repeat',
                'backgroundImage' : (!this.state.isGame) ? 'url(' + this.state.image.src + ')' : 'none'
            }
        },
        _onPaneChange : function(){
            this.setState({
                image:PaneStore.getImageData(),
                matrix:PaneStore.getMatrixData(),
                hole:PaneConstants.START_HOLE
            });
        },
        _onDone : function(){
            var _this = this;
            setTimeout(function(){
                _this.setState({ isGame : false });
                console.info('YOU WIN!'); // todo
            },ChunksConstants.ANIMATION_DURATION);

        }
});

module.exports = Pane;