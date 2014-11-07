/** @jsx React.DOM */
'use strict';
var React = require('react'),
    ChunksActions = require('../actions/ChunksActions'),
    PaneStore = require('../stores/PaneStore'),
    PaneConstants = require('../constants/PaneConstants'),
    Chunk = require('./Chunk'),
    Pane = React.createClass({
        getInitialState:function()
        {
            return {
                image:PaneStore.getImageData(),
                matrix:PaneStore.getMatrixData(),
                startHole:PaneConstants.START_HOLE
            };
        },
        componentDidMount:function(){
            ChunksActions.shuffle();
            PaneStore.on('change',this._onChange);
        },
        componentWillUnmount: function() {
            PaneStore.removeListener('change',this._onChange);
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

            return (<div className='container'>
                {chunks.map(function(chunk){
                    return <Chunk ref={'chunk'+chunk.x+chunk.y} key={'chunk-'+chunk.x+chunk.y} point={[chunk.x,chunk.y]} image={this.state.image} matrix={this.state.matrix} />;
                },this)}
            </div>);
        },

        _onChange : function(){
            this.setState({
                image:PaneStore.getImageData(),
                matrix:PaneStore.getMatrixData(),
                hole:PaneStore.getHoleData()
            });
        }
});

module.exports = Pane;