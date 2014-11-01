/** @jsx React.DOM */
'use strict';
var Container = React.createClass({
    getInitialState:function()
    {
        var matrix = {x:4,y:4},
            chunks = [],
            startHole = [0,0];

        for (var x = 0; x < matrix.x; x++) {
            for (var y = 0; y < matrix.y; y++) {
                if (!(x === startHole[0] && y === startHole[1])) {
                    chunks.push({x:x,y:y});
                }
            }
        }

        return {
            className : 'container',
            image:'img/covers/main.jpg',
            matrix:matrix,
            chunks:chunks,
            startHole:startHole,
            hole:startHole,
            shuffleDepth: 100
        };
    },
    componentDidMount:function(){
        this.shuffle();
    },
    render: function()
    {
        return (<div className={this.state.className}>
            {this.state.chunks.map(function(chunk){
                return <Chunk ref={'chunk'+chunk.x+chunk.y}
                    key={'chunk-'+chunk.x+chunk.y}
                    hole={this.state.hole}
                    onChunkMoved={this.onChunkMoved}
                    origPoint={[chunk.x,chunk.y]}
                    image={this.state.image}
                    matrix={this.state.matrix} />;
            },this)}
        </div>);
    },

    shuffle: function(){
        var axis, dir, newHole = [], i = 0, _this = this, intervalId;

        intervalId = setInterval(function(){
            axis = (Math.floor(Math.random() * 2)); // 0 || 1
            dir = (Math.floor(Math.random() * 2)) ? 1 : -1;

            if (axis === 0){
                if (_this.state.hole[0] === 0) dir = 1;
                if (_this.state.hole[0] === (_this.state.matrix.x-1)) dir = -1;
            } else if (axis === 1) {
                if (_this.state.hole[1] === 0) dir = 1;
                if (_this.state.hole[1] === (_this.state.matrix.y-1)) dir = -1;
            }

            newHole = _this.state.hole.slice(0);
            newHole[axis] = newHole[axis] + dir;

            _this.setState({hole:newHole});

            if (i === _this.state.shuffleDepth) clearInterval(intervalId);
            i++;
        },200);

/*        for (var i = 0; i < this.state.shuffleDepth; i++ ){
            axis = (Math.floor(Math.random() * 2)); // 0 || 1
            dir = (Math.floor(Math.random() * 2)) ? 1 : -1;

            if (axis === 0){
                if (this.state.hole[0] === 0) dir = 1;
                if (this.state.hole[0] === (this.state.matrix.x-1)) dir = -1;
            } else if (axis === 1) {
                if (this.state.hole[1] === 0) dir = 1;
                if (this.state.hole[1] === (this.state.matrix.y-1)) dir = -1;
            }

            newHole = this.state.hole.slice(0);
            newHole[axis] = newHole[axis] + dir;

            this.setState({hole:newHole});
        }*/
    },
    onChunkMoved : function(point){
        this.setState({hole:point});
    }

});